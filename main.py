from calculate_macros import get_nutrition_plan
from calculate_plan import create_daily_plan

# User input for the nutrition plan
weight_lbs = 155
height_ft = 5
height_in = 5
age = 21
gender = 'male'
activity_level = 'moderate'
weight_loss_goal_lbs = 5

# Get the user's nutrition plan
nutrition_plan = get_nutrition_plan(weight_lbs, height_ft, height_in, age, gender, activity_level, weight_loss_goal_lbs)

# Define the dining hall URL and date for the menu
url = 'https://www.bu.edu/dining/location/marciano/#menu'
date = '2024-09-16'

# Create the daily meal plan by calling the function from calculate_plan.py
daily_meal_plan = create_daily_plan(url, date, nutrition_plan)

# Display the meal plan for breakfast, lunch, and dinner
for meal_period, meals in daily_meal_plan.items():
    print(f"\nMeal Plan for {meal_period.capitalize()}:")
    for meal in meals:
        print(f"Location: {meal['location']}")
        print(f"Items: {meal['items']}")
        print(f"Calories: {meal['calories']}, Protein: {meal['protein']}g, Carbs: {meal['carbs']}g, Fat: {meal['fat']}g")
