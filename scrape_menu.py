import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv
import os
from datetime import datetime

load_dotenv()

USDA_API_KEY = os.getenv("USDA_API_KEY")
USDA_API_URL = "https://api.nal.usda.gov/fdc/v1/foods/search"

def strip_units(nutrient_value):
    return float(nutrient_value.replace('g', '').strip())

def adjust_info_from_calories(ingredient_calorie, api_calorie, protein, carbs, fat):
    if api_calorie == 0:
        return protein, carbs, fat
    ratio = ingredient_calorie / api_calorie
    return protein * ratio, carbs * ratio, fat * ratio

def get_nutritional_info(ingredient_name, ingredient_calories):
    response = requests.get(
        USDA_API_URL,
        params={
            "query": ingredient_name,
            "api_key": USDA_API_KEY,
            "pageSize": 1
        }
    )
    
    if response.status_code == 200:
        data = response.json()
        if data.get('foods'):
            nutrients = data['foods'][0].get('foodNutrients', [])
            calories = 0
            protein = 0
            carbs = 0
            fat = 0
            for nutrient in nutrients:
                nutrient_id = nutrient.get('nutrientId')
                amount = nutrient.get('value', 0)
                if nutrient_id == 1008:
                    calories = amount
                elif nutrient_id == 1003:
                    protein = amount
                elif nutrient_id == 1005:
                    carbs = amount
                elif nutrient_id == 1004:
                    fat = amount
            
            adjusted_protein, adjusted_carbs, adjusted_fat = adjust_info_from_calories(ingredient_calories, calories, protein, carbs, fat)
            return {
                'protein': round(adjusted_protein, 2),
                'carbs': round(adjusted_carbs, 2),
                'fat': round(adjusted_fat, 2)
            }
    return None

def scrape_menu(url, date_str, meal_period):
    meal_id = f"{date_str}-{meal_period}"
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')
    
    meal_section = soup.find('li', id=meal_id)
    
    if not meal_section:
        return []
    
    meals = meal_section.find_all('li', class_='menu-item')

    meal_data = []
    api_calls = 0
    for meal in meals:
        try:
            name = meal.find('h4', class_='js-nutrition-open-alias').text.strip()
            location = meal.find('strong', class_='js-sortby-station').text.strip()
            calories = int(meal.find('li', class_='menu-nutrition-cals').strong.text.strip())
            protein = strip_units(meal.find('li', class_='menu-nutrition-protein').strong.text.strip())
            carbs = strip_units(meal.find('li', class_='menu-nutrition-carbs').strong.text.strip())
            fat = strip_units(meal.find('li', class_='menu-nutrition-saturated-fat').strong.text.strip())
            
            ingredients_section = meal.find('ul', class_='nutrition-label-cyo')
            
            if ingredients_section:
                ingredient_items = ingredients_section.find_all('li', class_='nutrition-label-cyo-section')
                
                for item in ingredient_items:
                    ingredient_name = item.find('span', class_='nutrition-label-cyo-ingredient').text.strip()
                    ingredient_calories_text = item.find('span', class_='nutrition-label-cyo-cals').text.strip()
                    ingredient_calories = int(ingredient_calories_text.replace(' Calories', '').strip())
                    
                    ingredient_nutrition = get_nutritional_info(ingredient_name, ingredient_calories)
                    api_calls += 1
                    if ingredient_nutrition:
                        meal_data.append({
                            'name': ingredient_name,
                            'location': location,
                            'calories': ingredient_calories,
                            'protein': ingredient_nutrition['protein'],
                            'carbs': ingredient_nutrition['carbs'],
                            'fat': ingredient_nutrition['fat']
                        })
            
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
    print(f"Total API calls made: {api_calls}")
    return meal_data

