from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from calculate_macros import get_nutrition_plan
from calculate_plan import create_daily_plan
from datetime import date

app = FastAPI()

DINING_LOCATIONS = {
    "marciano": "https://www.bu.edu/dining/location/marciano/#menu",
    "warren": "https://www.bu.edu/dining/location/warren/#menu",
    "west": "https://www.bu.edu/dining/location/west/#menu",
    "granby": "https://www.bu.edu/dining/location/granby/#menu"
}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_meal_periods(date_obj):
    is_weekend = date_obj.weekday() >= 5
    if is_weekend:
        meal_periods = ['brunch', 'dinner']
    else:
        meal_periods = ['breakfast', 'lunch', 'dinner']
    return meal_periods

@app.post("/run-python")
async def generate_meal_plan(request: Request):
    body = await request.json()

    weight_lbs = float(body.get("weight"))
    height_ft = float(body.get("height_ft"))
    height_in = float(body.get("height_in"))
    age = int(body.get("age"))
    gender = body.get("gender")
    activity_level = body.get("activity_level")
    weight_loss_goal_lbs = float(body.get("weight_loss_goal"))
    dining_hall = body.get('dining_hall')  

    nutrition_plan = get_nutrition_plan(weight_lbs, height_ft, height_in, age, gender, activity_level, weight_loss_goal_lbs)

    urls = {
        'marciano': 'https://www.bu.edu/dining/location/marciano/#menu',
        'warren': 'https://www.bu.edu/dining/location/warren/#menu',
        'west': 'https://www.bu.edu/dining/location/west/#menu',
        'granby': 'https://www.bu.edu/dining/location/granby/#menu'
    }
    url = urls[dining_hall]
    date_today = date.today()

    meal_periods = get_meal_periods(date_today)

    daily_meal_plan = create_daily_plan(url, nutrition_plan, meal_periods, date_today, dining_hall)

    return {"meal_plan": daily_meal_plan}

