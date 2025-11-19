import scrapy

class QuotesSpider(scrapy.Spider):
    """Dynamic spider for scraping quotes with keyword filtering"""
    name = "quotes_spider"
    start_urls = ["http://quotes.toscrape.com/"]
    
    def __init__(self, query=None, results_queue=None, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.query = query or ""
        self.results_queue = results_queue

    def parse(self, response):
        """Parse response and filter by query"""
        results = []
        for quote in response.css("div.quote"):
            text = quote.css("span.text::text").get()
            author = quote.css("small.author::text").get()
            
            # Filter by query keyword (case-insensitive)
            if self.query.lower() in text.lower() or self.query.lower() in author.lower():
                results.append({
                    "text": text.strip() if text else "",
                    "author": author.strip() if author else ""
                })
        
        # Put results in queue for retrieval in main thread
        if self.results_queue:
            self.results_queue.put(results)