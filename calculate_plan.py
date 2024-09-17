from calculate_macros import get_nutrition_plan, split_macros_by_meal
from scrape_menu import scrape_menu

def filter_meals(meals):
    """Filter out meals with zero calories and group by location."""
    filtered_meals = []
    
    for meal in meals:
        if meal['calories'] > 0:
            filtered_meals.append(meal)
    
    return filtered_meals

def group_meals_by_location(meals):
    """Group meals by their location into a 'meal'."""
    grouped_meals = {}
    
    for meal in meals:
        location = meal['location']
        if location not in grouped_meals:
            grouped_meals[location] = {
                'items': [],
                'total_calories': 0,
                'total_protein': 0,
                'total_carbs': 0,
                'total_fat': 0
            }
        
        grouped_meals[location]['items'].append(meal['name'])
        grouped_meals[location]['total_calories'] += meal['calories']
        grouped_meals[location]['total_protein'] += meal['protein']
        grouped_meals[location]['total_carbs'] += meal['carbs']
        grouped_meals[location]['total_fat'] += meal['fat']
    
    return grouped_meals

def create_daily_plan(url, date, nutrition_plan):
    """Generate a meal plan based on the calculated nutrition plan."""
    meal_macros = split_macros_by_meal(nutrition_plan)
    meal_periods = ['breakfast', 'lunch', 'dinner']
    daily_plan = {}

    for meal_period in meal_periods:
        print(f"\nSelecting meals for {meal_period.capitalize()} based on the following macros:")
        print(meal_macros[meal_period])
        
        menu = scrape_menu(url, date, meal_period)
        menu = filter_meals(menu) 
        
        grouped_meals = group_meals_by_location(menu)
        selected_meals = []

        total_calories, total_protein, total_carbs, total_fat = 0, 0, 0, 0
        
        for location, meal_info in grouped_meals.items():
            if (total_calories + meal_info['total_calories'] <= meal_macros[meal_period]['calories'] and
                total_protein + meal_info['total_protein'] <= meal_macros[meal_period]['protein'] and
                total_carbs + meal_info['total_carbs'] <= meal_macros[meal_period]['carbs']):
                
                selected_meals.append({
                    'location': location,
                    'items': meal_info['items'],
                    'calories': meal_info['total_calories'],
                    'protein': meal_info['total_protein'],
                    'carbs': meal_info['total_carbs'],
                    'fat': meal_info['total_fat']
                })
                
                total_calories += meal_info['total_calories']
                total_protein += meal_info['total_protein']
                total_carbs += meal_info['total_carbs']
                total_fat += meal_info['total_fat']
        
        daily_plan[meal_period] = selected_meals
    
    return daily_plan

