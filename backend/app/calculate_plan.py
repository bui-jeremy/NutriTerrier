from datetime import date
import logging

# Define the distribution of macros by meal period
MEAL_PERIOD_DISTRIBUTION = {
    "breakfast": 0.3,
    "lunch": 0.3,
    "brunch": 0.6,
    "dinner": 0.4
}

def group_meals_by_location(meals):
    """Group meals by location with aggregated nutritional values."""
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

def filter_meals(meals):
    """Filter and prioritize high-calorie, nutrient-dense foods, excluding bakery items and 0-calorie items."""
    high_priority_items = []
    moderate_priority_items = []
    low_priority_items = []

    for meal in meals:
        # Exclude items from the bakery location and items with 0 calories
        if meal['location'].lower() == 'bakery' or meal['calories'] == 0:
            continue
        
        # High priority: Higher calories and decent protein
        if meal['calories'] >= 150 and meal['protein'] >= 5:
            high_priority_items.append(meal)
        # Moderate priority: Moderate calorie items
        elif 50 <= meal['calories'] < 150:
            moderate_priority_items.append(meal)
        # Low priority: Very low-calorie items (< 50 calories)
        elif meal['calories'] < 50:
            low_priority_items.append(meal)

    return {
        "high_priority_items": high_priority_items,
        "moderate_priority_items": moderate_priority_items,
        "low_priority_items": low_priority_items
    }

def create_daily_plan(meal_data, nutrition_plan, meal_period, calorie_multiplier=1.1):
    """Create a meal plan for the given meal period to meet or slightly exceed nutrition targets."""
    # Calculate target macros based on the meal period distribution
    distribution = MEAL_PERIOD_DISTRIBUTION.get(meal_period, 0.25)
    target_macros = {
        "calories": nutrition_plan["calories"] * distribution * calorie_multiplier,
        "protein": nutrition_plan["protein"] * distribution,
        "carbs": nutrition_plan["carbs"] * distribution,
        "fat": nutrition_plan["fat"] * distribution,
    }

    # Categorize meals
    categorized_meals = filter_meals(meal_data)
    high_priority_items = categorized_meals["high_priority_items"]
    moderate_priority_items = categorized_meals["moderate_priority_items"]
    low_priority_items = categorized_meals["low_priority_items"]

    # Sort items by protein-to-calorie ratio, prioritizing protein density
    all_items = high_priority_items + moderate_priority_items
    sorted_items = sorted(all_items, key=lambda x: x['protein'] / max(x['calories'], 1), reverse=True)

    selected_meals = []
    total_calories, total_protein, total_carbs, total_fat = 0, 0, 0, 0

    # Primary pass: Add high and moderate priority items to meet calorie and protein targets
    for item in sorted_items:
        if total_calories >= target_macros['calories'] + (target_macros['calories'] * 0.15):
            break

        selected_meals.append({
            'name': item['name'],
            'location': item['location'],
            'calories': item['calories'],
            'protein': item['protein'],
            'carbs': item['carbs'],
            'fat': item['fat']
        })
        total_calories += item['calories']
        total_protein += item['protein']
        total_carbs += item['carbs']
        total_fat += item['fat']

    # Add 1-2 low-calorie items even if goals are met
    selected_low_calorie_items = []
    low_calorie_count = 0
    for item in low_priority_items:
        if low_calorie_count >= 3:
            break
        selected_low_calorie_items.append({
            'name': item['name'],
            'location': item['location'],
            'calories': item['calories'],
            'protein': item['protein'],
            'carbs': item['carbs'],
            'fat': item['fat']
        })
        total_calories += item['calories']
        low_calorie_count += 1

    # Secondary pass: Add remaining items to ensure calorie goal is met
    for item in sorted_items:
        if total_calories >= target_macros['calories'] + (target_macros['calories'] * 0.15):
            break
        if item not in selected_meals:
            selected_meals.append({
                'name': item['name'],
                'location': item['location'],
                'calories': item['calories'],
                'protein': item['protein'],
                'carbs': item['carbs'],
                'fat': item['fat']
            })
            total_calories += item['calories']
            total_protein += item['protein']
            total_carbs += item['carbs']
            total_fat += item['fat']

    # Final pass: If we still haven’t met the calorie goal, repeat high-priority items (e.g., meats)
    while total_calories < target_macros['calories']:
        for item in high_priority_items:
            if total_calories >= target_macros['calories']:
                break
            selected_meals.append({
                'name': item['name'],
                'location': item['location'],
                'calories': item['calories'],
                'protein': item['protein'],
                'carbs': item['carbs'],
                'fat': item['fat']
            })
            total_calories += item['calories']
            total_protein += item['protein']
            total_carbs += item['carbs']
            total_fat += item['fat']

    # Store meal plan for the current meal period
    meal_plan = {
        'main_meals': selected_meals,
        'low_calorie_items': selected_low_calorie_items
    }
    
    logging.info(f"Total calories achieved: {total_calories}, Total protein achieved: {total_protein}")
    return meal_plan
