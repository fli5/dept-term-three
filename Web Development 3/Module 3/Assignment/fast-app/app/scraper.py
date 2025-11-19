import scrapy

"""
A simple Scrapy spider to scrape quotes from quotes.toscrape.com
"""
class QuotesSpider(scrapy.Spider):
    # Define the name of the spider
    name = "quotes"

    def __init__(self, query=None, results=None, **kwargs):
        super().__init__(**kwargs)
        self.query = query
        self.results = results

    def start_requests(self):
        yield scrapy.Request("https://quotes.toscrape.com")

    def parse(self, response):
        for quote in response.css("div.quote"):
            text = quote.css("span.text::text").get()
            author = quote.css("small.author::text").get()

            if self.query.lower() in text.lower():
                self.results.append({"text": text, "author": author})
