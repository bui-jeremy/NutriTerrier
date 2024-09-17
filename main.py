from calculate_macros import get_nutrition_plan, split_macros_by_meal
from scrape_menu import scrape_menu

weight_lbs = 155
height_ft = 5
height_in = 5
age = 21
gender = 'male'
activity_level = 'moderate'
weight_loss_goal_lbs = 5

nutrition_plan = get_nutrition_plan(weight_lbs, height_ft, height_in, age, gender, activity_level, weight_loss_goal_lbs)
meal_macros = split_macros_by_meal(nutrition_plan)

url = 'https://www.bu.edu/dining/location/marciano/#menu'
date = '2024-09-16'
meal_periods = ['breakfast', 'lunch', 'dinner']

for meal_period in meal_periods:
    print(f"\nSelecting meals for {meal_period.capitalize()} based on the following macros:")
    print(meal_macros[meal_period])
    
    menu = scrape_menu(url, date, meal_period)
    total_calories, total_protein, total_carbs = 0, 0, 0
    selected_meals = []
    
    for meal in menu:
        if (total_calories + meal['calories'] <= meal_macros[meal_period]['calories'] and
            total_protein + meal['protein'] <= meal_macros[meal_period]['protein'] and
            total_carbs + meal['carbs'] <= meal_macros[meal_period]['carbs']):
            selected_meals.append(meal)
            total_calories += meal['calories']
            total_protein += meal['protein']
            total_carbs += meal['carbs']
    
    print(f"Selected meals for {meal_period.capitalize()}:")
    for meal in selected_meals:
        print(meal)
