from calculate_macros import get_nutrition_plan
from calculate_plan import create_daily_plan
from datetime import date
def get_meal_periods(date_obj):
    is_weekend = date_obj.weekday() >= 5
    
    if is_weekend:
        meal_periods = ['brunch', 'dinner']
    else:
        meal_periods = ['breakfast', 'lunch', 'dinner']
    return meal_periods

weight_lbs = 155
height_ft = 5
height_in = 5
age = 21
gender = 'male'
activity_level = 'moderate'
weight_loss_goal_lbs = 5

nutrition_plan = get_nutrition_plan(weight_lbs, height_ft, height_in, age, gender, activity_level, weight_loss_goal_lbs)

url = 'https://www.bu.edu/dining/location/marciano/#menu'
date_today = date.today()
meal_periods = get_meal_periods(date_today)
daily_meal_plan = create_daily_plan(url, nutrition_plan, meal_periods, date_today)

for meal_period, meals in daily_meal_plan.items():
    print(f"\nMeal Plan for {meal_period.capitalize()}:")
    for meal in meals:
        print(f"Location: {meal['location']}")
        print(f"Items: {meal['items']}")
        print(f"Calories: {meal['calories']}, Protein: {meal['protein']}g, Carbs: {meal['carbs']}g, Fat: {meal['fat']}g")

