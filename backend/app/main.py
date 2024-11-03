from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from calculate_plan import create_daily_plan
from calculate_macros import get_nutrition_plan
from datetime import date
from pymongo import MongoClient
from pydantic import BaseModel
import os
import logging
from dotenv import load_dotenv
from datetime import datetime, date

# Initialize logging
logging.basicConfig(level=logging.INFO)
load_dotenv()

app = FastAPI()

# MongoDB client connection
client = MongoClient(os.getenv("MONGO_URI"))

# Access databases
user_db = client['user_database']
meal_db = client['meal_database']

# Access collections
user_collection = user_db['user_data']

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define a model for user settings
class UserSettings(BaseModel):
    name: str
    email: str
    age: int
    gender: str
    weight: float
    height: float
    activityLevel: str
    weightChange: float
    goal: str
    diningHall: str

class Meal(BaseModel):
    name: str
    calories: int
    protein: int
    carbs: int
    fat: int

class AddMealRequest(BaseModel):
    email: str
    meal: Meal


@app.post("/api/user/settings")
async def save_user_settings(user: UserSettings):
    logging.info(f"Received user data: {user}")

    # Calculate nutrition plan using kg and cm directly
    nutrition_plan = get_nutrition_plan(
        weight_kg=user.weight,
        height_cm=user.height,
        age=user.age,
        gender=user.gender,
        activity_level=user.activityLevel,
        weight_loss_goal_kg=0  # Assuming no weight change for maintenance or bulking
    )

    # Add nutrition data to user object
    user_data = user.dict()
    user_data.update({
        "calories": nutrition_plan['calories'],
        "protein": nutrition_plan['macros']['protein'],
        "carbs": nutrition_plan['macros']['carbs'],
        "fat": nutrition_plan['macros']['fat'],
        "weightChange": user.weightChange
    })

    # Check if user already exists in the database (using email as a unique identifier)
    existing_user = user_collection.find_one({"email": user.email})

    if existing_user:
        user_collection.update_one({"email": user.email}, {"$set": user_data})
        logging.info(f"Updated user settings for {user.email}")
    else:
        user_collection.insert_one(user_data)
        logging.info(f"Inserted new user settings for {user.email}")

    return {"message": "User settings saved successfully"}

@app.get("/api/dining-hall/{dining_hall}/{time_of_day}")
async def get_dining_hall_items(dining_hall: str, time_of_day: str):
    logging.info("Fetching dining hall items")
    collection_name = f"{dining_hall}_meals"
    today_date = date.today().isoformat()

    items = list(meal_db[collection_name].find(
        {"date": today_date, "meal_period": time_of_day},
        {"_id": 0}
    ))

    if not items:
        raise HTTPException(status_code=404, detail="No items found for this meal period")

    return {"items": items}

@app.get("/api/user/{email}")
async def get_user_data(email: str):
    user = user_collection.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.pop("_id")
    return user

DINING_HALL_MAP = {
    "warren dining hall": "warren",
    "marciano dining hall": "marciano",
    "west dining hall": "west",
}


@app.get("/api/generate-meal-plan")
async def generate_meal_plan(email: str):
    logging.info(f"Generating meal plan for {email}")

    # Fetch user data from the database
    user = user_collection.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Use the user's nutrition data directly
    nutrition_plan = {
        "calories": user.get("calories"),
        "protein": user.get("protein"),
        "carbs": user.get("carbs"),
        "fat": user.get("fat")
    }
    # Check if all required nutrition data is present
    if not all(nutrition_plan.values()):
        raise HTTPException(status_code=400, detail="Incomplete nutrition data for user")

    user_dining_hall = user.get("diningHall", "marciano").lower()
    dining_hall_collection = DINING_HALL_MAP.get(user_dining_hall)
    if not dining_hall_collection:
        raise HTTPException(status_code=400, detail="Invalid dining hall selected")
    meal_periods = ["breakfast", "lunch", "brunch", "dinner"]
    today_date = date.today().isoformat()

    # Distribution for each meal period (adjust as needed)
    MEAL_PERIOD_DISTRIBUTION = {
        "breakfast": 0.25,
        "brunch": 0.35,
        "lunch": 0.30,
        "dinner": 0.40
    }

    # Fetch meals separately for each meal period and generate a plan for each
    daily_plan = []
    for period in meal_periods:
        meal_data = list(meal_db[f"{dining_hall_collection}_meals"].find({
            "date": today_date,
            "meal_period": period
        }, {"_id": 0}))

        if not meal_data:
            logging.warning(f"No meals found for {period} in {dining_hall_collection} on {today_date}")
            continue

        # Calculate the desired macros for the period based on distribution
        distribution = MEAL_PERIOD_DISTRIBUTION.get(period, 0.25)
        period_nutrition_plan = {
            "calories": nutrition_plan["calories"] * distribution,
            "protein": nutrition_plan["protein"] * distribution,
            "carbs": nutrition_plan["carbs"] * distribution,
            "fat": nutrition_plan["fat"] * distribution
        }
        
        logging.info(f"Desired macros for {period}: {period_nutrition_plan}")
        
        # Pass the period_nutrition_plan instead of the full day nutrition_plan
        daily_plan.append({
            "period": period,
            "meals": create_daily_plan(meal_data, period_nutrition_plan, period)
        })
    return daily_plan


@app.post("/api/user/add-meal")
async def add_meal(request: AddMealRequest):
    email = request.email
    meal = request.meal.dict()  # Convert to dictionary for MongoDB compatibility

    # Find the user in the database
    user = user_collection.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Add the meal to the user's daily intake
    user_meals = user.get("meals", [])
    user_meals.append(meal)

    # Update total macros for the day
    total_calories = user.get("total_calories", 0) + meal["calories"]
    total_protein = user.get("total_protein", 0) + meal["protein"]
    total_carbs = user.get("total_carbs", 0) + meal["carbs"]
    total_fat = user.get("total_fat", 0) + meal["fat"]

    # Update the user document in MongoDB
    user_collection.update_one(
        {"email": email},
        {
            "$set": {
                "meals": user_meals,
                "total_calories": total_calories,
                "total_protein": total_protein,
                "total_carbs": total_carbs,
                "total_fat": total_fat,
            }
        }
    )

    return {"message": "Meal added successfully"}

@app.get("/api/user/{email}/consumed-macros")
async def get_consumed_macros(email: str):
    user = user_collection.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    consumed_macros = {"calories": 0, "protein": 0, "carbs": 0, "fat": 0}

    if "meals" in user:
        for meal in user["meals"]:
            consumed_macros["calories"] += meal.get("calories", 0)
            consumed_macros["protein"] += meal.get("protein", 0)
            consumed_macros["carbs"] += meal.get("carbs", 0)
            consumed_macros["fat"] += meal.get("fat", 0)
    
    return consumed_macros