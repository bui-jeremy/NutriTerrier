import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv
import os
from datetime import datetime
from pymongo import MongoClient
from pymongo.server_api import ServerApi

load_dotenv()

# Set up MongoDB connection
uri = os.getenv("MONGO_URI")
client = MongoClient(uri, server_api=ServerApi('1'))
db = client['meal_database']
meals_collection = db['meals']

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

# USDA API details
USDA_API_KEY = os.getenv("USDA_API_KEY")
USDA_API_URL = "https://api.nal.usda.gov/fdc/v1/foods/search"

DINING_HALL_COLLECTIONS = {
    'marciano': db['marciano_meals'],
    'warren': db['warren_meals'],
    'west': db['west_meals'],
    'granby': db['granby_meals']
}

DINING_HALL_URLS = {
    'marciano': 'https://example.com/marciano_menu',
    'warren': 'https://example.com/warren_menu',
    'west': 'https://example.com/west_menu',
    'granby': 'https://example.com/granby_menu'
}

# Utility functions and scraping functions here...

def scrape_menu_or_get_cached(date_str, meal_period, dining_hall):
    """Scrape the menu or get cached data from the MongoDB collection based on dining hall."""
    meals_collection = DINING_HALL_COLLECTIONS.get(dining_hall)
    url = DINING_HALL_URLS.get(dining_hall)

    if not url:
        print(f"No URL found for dining hall {dining_hall}")
        return []

    cached_menu = meals_collection.find_one({"date": date_str, "meal_period": meal_period})
    
    if cached_menu:
        return cached_menu['meals']

    menu = scrape_menu(url, date_str, meal_period)

    if menu:
        meals_collection.insert_one({
            "date": date_str,
            "meal_period": meal_period,
            "meals": menu
        })
    
    return menu
j