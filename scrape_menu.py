import requests
from bs4 import BeautifulSoup

def strip_units(nutrient_value):
    return float(nutrient_value.replace('g', '').strip())

def scrape_menu(url, date, meal_period):
    meal_id = f"{date}-{meal_period}"
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')
    
    meal_section = soup.find('li', id=meal_id)
    
    if not meal_section:
        return []
    
    meals = meal_section.find_all('li', class_='menu-item')

    meal_data = []
    
    for meal in meals:
        try:
            name = meal.find('h4', class_='js-nutrition-open-alias').text.strip()
            location = meal.find('strong', class_='js-sortby-station').text.strip()
            calories = int(meal.find('li', class_='menu-nutrition-cals').strong.text.strip())
            protein = strip_units(meal.find('li', class_='menu-nutrition-protein').strong.text.strip())
            carbs = strip_units(meal.find('li', class_='menu-nutrition-carbs').strong.text.strip())
            fat = strip_units(meal.find('li', class_='menu-nutrition-saturated-fat').strong.text.strip())
            
            meal_data.append({
                'name': name,
                'location': location,
                'calories': calories,
                'protein': protein,
                'carbs': carbs,
                'fat': fat
            })
        
        except AttributeError:
            continue
    
    return meal_data
