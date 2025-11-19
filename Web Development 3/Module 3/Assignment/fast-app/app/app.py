import os
import threading
from flask import Flask, request, jsonify, send_file, render_template_string
from PIL import Image
from io import BytesIO
import sys

# ------------------------------
# Windows specific configuration to avoid Twisted signal handling issues
if sys.platform == "win32":
    # Select the asyncio event loop (SelectorEventLoop) policy on Windows
    # Because the default ProactorEventLoop does not work well with Twisted
    asyncio_policy = __import__("asyncio").WindowsSelectorEventLoopPolicy()
    __import__("asyncio").set_event_loop_policy(asyncio_policy)

# Install the asyncio reactor for compatibility with Flask
# Because Flask uses asyncio under the hood
from twisted.internet import asyncioreactor
asyncioreactor.install()
# -------------------------------

import scrapy
from twisted.internet import reactor, defer
from scrapy.crawler import CrawlerRunner
from app.scraper import QuotesSpider

app = Flask(__name__)

# -------------------------------
# Avoid starting multiple reactors
runner = CrawlerRunner(settings={'LOG_ENABLED': True})
reactor_started = False
def start_reactor():
    global reactor_started
    if not reactor_started:
        print("Starting Twisted reactor...")
        reactor_started = True
        reactor.run(installSignalHandlers=False)

# Start the reactor in a separate thread in daemon mode
threading.Thread(target=start_reactor, daemon=True).start()
# -------------------------------

# Defined supported output image types
OUTPUT_TYPES = ["JPEG", "PNG", "BMP", "GIF", "TIFF"]

# -------------------------------
# Index route
# -------------------------------
@app.route("/")
def index():
    usage_html = """
    <h2>API Usage Documentation</h2>

    <h3>1. Image Conversion API</h3>
    <p><b>POST /convert</b></p>
    <p>Convert an uploaded image into another format using Pillow.</p>

    <h4>Parameters (form-data)</h4>
    <ul>
        <li><b>image</b> — (File, required) The uploaded image</li>
        <li><b>output_type</b> — (String, required) Target format. Must be one of:
            <code>JPEG, PNG, BMP, GIF, TIFF</code>
        </li>
    </ul>

    <h4>Supported Output Types</h4>
    <pre>["JPEG", "PNG", "BMP", "GIF", "TIFF"]</pre>

    <h4>cURL Example</h4>
    <pre>
curl -X POST http://localhost:5000/convert \
  -F "image=@test.png" \
  -F "output_type=JPEG" \
  -o converted.jpeg
    </pre>

    <h4>Successful Response</h4>
    <p>Returns the converted image file (binary download).</p>

    <h4>Error Examples</h4>
    <pre>{
  "error": "Missing image file or output_type"
}</pre>
    <pre>{
  "error": "Unsupported output type. Available types: ['JPEG','PNG','BMP','GIF','TIFF']"
}</pre>


    <hr>

    <h3>2. Quotes Search API (Scrapy)</h3>
    <p><b>POST /search</b></p>
    <p>Search quotes containing a keyword from <i>quotes.toscrape.com</i>.  
    Uses Scrapy and waits for the spider to finish.</p>

    <h4>Headers</h4>
    <pre>Content-Type: application/json</pre>

    <h4>Parameters (JSON Body)</h4>
    <ul>
        <li><b>query</b> — (String, required) Keyword used to filter quotes</li>
    </ul>

    <h4>cURL Example</h4>
    <pre>
curl -X POST http://localhost:5000/search \
  -H "Content-Type: application/json" \
  -d '{"query": "life"}'
    </pre>

    <h4>Successful Response Example</h4>
    <pre>{
  "query": "life",
  "matches": [
    {"text": "...", "author": "..."},
    {"text": "...", "author": "..."}
  ]
}
    </pre>

    <h4>Error Examples</h4>
    <pre>{
  "error": "Content-Type must be application/json"
}</pre>

    <pre>{
  "error": "Missing query parameter"
}</pre>

    <p><i>Note: The API will wait until Scrapy finishes crawling.</i></p>

    """

    return render_template_string(usage_html)

# -------------------------------
# Image conversion route
# -------------------------------
@app.route("/convert", methods=["POST"])
def convert_image():
    if 'image' not in request.files or 'output_type' not in request.form:
        return jsonify({"error": "Missing image file or output_type"}), 400

    image_field = request.files['image']
    output_type = request.form['output_type'].upper()

    # Allow only supported output types
    if output_type not in OUTPUT_TYPES:
        return jsonify({"error": f"Unsupported output type. Available types: {OUTPUT_TYPES}"}), 400

    try:
        # Open the image stream with PIL
        pillow_image = Image.open(image_field.stream)

        # Create output in memory
        output_io = BytesIO()

        # Save the converted image to the output IO stream
        pillow_image.save(output_io, format=output_type)

        # Move the cursor to the beginning of the stream for sending the complete file
        output_io.seek(0)

        filename = f"converted.{output_type.lower()}"
        return send_file(output_io, download_name=filename, mimetype=f"image/{output_type.lower()}")
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -------------------------------
# Quotes filter route
# -------------------------------
@app.route("/search", methods=["POST"])
def scrape_quote():
    """
    Example: user sends JSON {"query": "Python"} 
    We use Scrapy to scrape quotes.toscrape.com containing the keyword.
    """
    # Check Content-Type
    content_type = request.headers.get('Content-Type')
    if (content_type is None) or (content_type!='application/json'):
        return jsonify({"error": "Content-Type must be application/json"}), 400

    # Get query parameter from JSON body
    parameter_body = request.get_json()
    if not parameter_body or "query" not in parameter_body:
        return jsonify({"error": "Missing query parameter"}), 400
    query_parameter = parameter_body["query"]

    query_results = []

    # Create an event to signal for thread synchronization
    finished_event = threading.Event()

    # Define a deferred function to run the spider
    @defer.inlineCallbacks
    def run_spider():
        # Start the crawling process asynchronously
        yield runner.crawl(QuotesSpider, query=query_parameter, results=query_results)

        # Signal that the spider has finished
        finished_event.set()

    # Schedule the spider to run in the reactor thread
    reactor.callFromThread(run_spider)

    # Wait for the spider to finish
    finished_event.wait()

    return jsonify(
        {"query": query_parameter, "matches": query_results}
    )


# -------------------------------
# Run Flask
# -------------------------------
if __name__ == "__main__":
    app.run(debug=True)
