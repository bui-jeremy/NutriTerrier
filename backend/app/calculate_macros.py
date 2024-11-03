def calculate_bmr(weight_kg, height_cm, age, gender):
    if gender == 'male':
        return 10 * weight_kg + 6.25 * height_cm - 5 * age + 5
    else:
        return 10 * weight_kg + 6.25 * height_cm - 5 * age - 161

def calculate_daily_calories(bmr, activity_level):
    activity_factors = {
        'sedentary': 1.2,
        'light': 1.375,
        'moderate': 1.55,
        'very_active': 1.725
    }
    return bmr * activity_factors.get(activity_level, 1.2)

def calculate_macros(calories):
    protein_calories = calories * 0.25
    carb_calories = calories * 0.45
    fat_calories = calories * 0.30
    
    protein_grams = protein_calories / 4
    carb_grams = carb_calories / 4
    fat_grams = fat_calories / 9
    
    return {
        'protein': protein_grams,
        'carbs': carb_grams,
        'fat': fat_grams
    }

def calculate_deficit(weight_loss_goal_lbs):
    calories_needed_to_lose = weight_loss_goal_lbs * 3500  
    daily_deficit = calories_needed_to_lose / 30
    return daily_deficit

def get_nutrition_plan(weight_kg, height_cm, age, gender, activity_level, weight_loss_goal_kg):
    bmr = calculate_bmr(weight_kg, height_cm, age, gender)
    daily_calories = calculate_daily_calories(bmr, activity_level)
    
    daily_deficit = weight_loss_goal_kg * 7700 / 30  # Approx. 7700 kcal per kg of body weight
    daily_calories -= daily_deficit

    macros = calculate_macros(daily_calories)
    
    return {
        'calories': daily_calories,
        'macros': macros
    }

def split_macros_by_meal(macros, is_weekend=False):
    if is_weekend:
        return {
            'brunch': {
                'calories': macros['calories'] * 0.55,
                'protein': macros['macros']['protein'] * 0.55,
                'carbs': macros['macros']['carbs'] * 0.55,
                'fat': macros['macros']['fat'] * 0.55
            },
            'dinner': {
                'calories': macros['calories'] * 0.45,
                'protein': macros['macros']['protein'] * 0.45,
                'carbs': macros['macros']['carbs'] * 0.45,
                'fat': macros['macros']['fat'] * 0.45
            }
        }
    else:
        return {
            'breakfast': {
                'calories': macros['calories'] * 0.25,
                'protein': macros['macros']['protein'] * 0.25,
                'carbs': macros['macros']['carbs'] * 0.25,
                'fat': macros['macros']['fat'] * 0.25
            },
            'lunch': {
                'calories': macros['calories'] * 0.40,
                'protein': macros['macros']['protein'] * 0.40,
                'carbs': macros['macros']['carbs'] * 0.40,
                'fat': macros['macros']['fat'] * 0.40
            },
            'dinner': {
                'calories': macros['calories'] * 0.35,
                'protein': macros['macros']['protein'] * 0.35,
                'carbs': macros['macros']['carbs'] * 0.35,
                'fat': macros['macros']['fat'] * 0.35
            }
        }
