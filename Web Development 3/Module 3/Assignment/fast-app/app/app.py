import os
from flask import Flask, request, jsonify, send_file, render_template_string
from PIL import Image
from io import BytesIO
import scrapy
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings

app = Flask(__name__)

# 临时上传目录
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# 支持的输出类型
OUTPUT_TYPES = ["JPEG", "PNG", "BMP", "GIF", "TIFF"]

# -------------------------------
# Index route
# -------------------------------
@app.route("/")
def index():
    usage_instructions = f"""
    <h2>Flask App Usage</h2>
    <ul>
        <li>POST /convert: Convert an image to another type. Available types: {', '.join(OUTPUT_TYPES)}</li>
        <li>POST /scrapy_action: Use Scrapy to scrape something based on your input.</li>
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

    file = request.files['image']
    output_type = request.form['output_type'].upper()

    if output_type not in OUTPUT_TYPES:
        return jsonify({"error": f"Unsupported output type. Available types: {OUTPUT_TYPES}"}), 400

    try:
        img = Image.open(file.stream)
        output_io = BytesIO()
        img.save(output_io, format=output_type)
        output_io.seek(0)
        filename = f"converted.{output_type.lower()}"
        return send_file(output_io, download_name=filename, mimetype=f"image/{output_type.lower()}")
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# -------------------------------
# Scrapy route
# -------------------------------
@app.route("/crawl", methods=["POST"])
def scrapy_action():
    """
    Example: user sends JSON {"query": "Python"} 
    We use Scrapy to scrape quotes.toscrape.com containing the keyword.
    """
    data = request.get_json()
    if not data or "query" not in data:
        return jsonify({"error": "Missing query parameter"}), 400

    query = data["query"]

    # Define a simple Scrapy Spider dynamically
    class QuotesSpider(scrapy.Spider):
        name = "quotes_spider"
        start_urls = ["http://quotes.toscrape.com/"]
        results = []

        def parse(self, response):
            for quote in response.css("div.quote"):
                text = quote.css("span.text::text").get()
                author = quote.css("small.author::text").get()
                if query.lower() in text.lower() or query.lower() in author.lower():
                    self.results.append({"text": text, "author": author})

    # Run the spider
    process = CrawlerProcess(settings={
        "LOG_ENABLED": True  # 不打印 Scrapy 日志
    })
    spider = QuotesSpider()
    process.crawl(QuotesSpider, results=spider.results)
    process.start()  # 阻塞直到完成

    return jsonify({"query": query, "matches": spider.results})

# -------------------------------
# Run Flask
# -------------------------------
if __name__ == "__main__":
    app.run(debug=True)
