import os
import threading
from flask import Flask, request, jsonify, send_file, render_template_string
from PIL import Image
from io import BytesIO
import scrapy
from twisted.internet import reactor, defer
from scrapy.crawler import CrawlerRunner
from app.scraper import QuotesSpider

app = Flask(__name__)

# Avoid starting multiple reactors
runner = CrawlerRunner()
reactor_started = False
def start_reactor():
    global reactor_started
    if not reactor_started:
        reactor_started = True
        reactor.run(installSignalHandlers=False)

# Start the reactor in a separate thread in daemon mode
threading.Thread(target=start_reactor, daemon=True).start()

# # Create uploads directory if it doesn't exist
# UPLOAD_FOLDER = "uploads"
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)
# app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Defined supported output image types
OUTPUT_TYPES = ["JPEG", "PNG", "BMP", "GIF", "TIFF"]

# -------------------------------
# Index route
# -------------------------------
@app.route("/")
def index():
    usage_instructions = f"""
    <h2>Flask App Usage</h2>
    <ul>
        <li>POST /convert: Convert an image to another type. Available types: {', '.join(OUTPUT_TYPES)} <br>
        For example, use cURL: <br>
        curl -X POST -F "image=@example.jpg" -F "output_type=PNG" http://127.0.0.1:5000/convert --output converted.png
        method: POST
        parameters: 
        1. image (file)
        2. output_type (string)
        </li>
        <li>POST /search: Filter quotes with specified keyword.
        method: POST
        parameters:
        1. query (string) - JSON body {"query": "keyword"}
        </li>
    </ul>
    """
    return render_template_string(usage_instructions)

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
