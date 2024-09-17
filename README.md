# NutriTerrier
import requests
from bs4 import BeautifulSoup

# Function to scrape the dining hall page
def scrape_menu(url):
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')
    
    meals = soup.find_all('li', class_='menu-item')  # Find all meal items

    meal_data = []
    
    for meal in meals:
        try:
            # Extract meal name
            name = meal.find('h4', class_='js-nutrition-open-alias').text.strip()
            
            # Extract location
            location = meal.find('strong', class_='js-sortby-station').text.strip()
            
            # Extract nutritional information
            calories = meal.find('li', class_='menu-nutrition-cals').strong.text.strip()
            protein = meal.find('li', class_='menu-nutrition-protein').strong.text.strip()
            carbs = meal.find('li', class_='menu-nutrition-carbs').strong.text.strip()
            fat = meal.find('li', class_='menu-nutrition-saturated-fat').strong.text.strip()
            
            # Append the scraped data to the meal_data list
            meal_data.append({
                'name': name,
                'location': location,
                'calories': int(calories),
                'protein': float(protein),
                'carbs': float(carbs),
                'fat': float(fat)
            })
        
        except AttributeError:
            # Handle any missing data by skipping that meal
            continue
    
    return meal_data

# Example usage
url = 'YOUR_DINING_HALL_PAGE_URL'  # Replace with the actual URL
menu = scrape_menu(url)

# Print scraped data
for meal in menu:
    print(meal)
