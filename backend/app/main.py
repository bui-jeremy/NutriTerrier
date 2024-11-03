from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .calculate_macros import get_nutrition_plan
from .calculate_plan import create_daily_plan
from datetime import date
from pymongo import MongoClient
from pydantic import BaseModel
import os
import logging
from dotenv import load_dotenv

# Initialize logging
logging.basicConfig(level=logging.INFO)
load_dotenv()

app = FastAPI()

# MongoDB client connection
client = MongoClient(os.getenv("MONGO_URI"))
db = client['user_database']  # Database where user data will be stored
user_collection = db['user_data']  # Collection for user data

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define a Pydantic model for user data
class UserSettings(BaseModel):
    name: str
    email: str
    age: int
    gender: str
    weight: float
    height: float
    activityLevel: str
    goal: str
    diningHall: str

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
        "fat": nutrition_plan['macros']['fat']
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

@app.post("/api/user/nutrition")
async def get_user_nutrition(request: Request):
    # Extract email from request body
    body = await request.json()
    email = body.get("email")

    if not email:
        raise HTTPException(status_code=400, detail="Email is required")

    # Query MongoDB for a user document matching the provided email
    user_data = user_collection.find_one({"email": email})

    if not user_data:
        raise HTTPException(status_code=404, detail="User not found")

    # Extract and format the nutrition data from the found document
    nutrition_data = {
        "calories": user_data.get("calories", 0),
        "macros": {
            "protein": user_data.get("protein", 0),
            "carbs": user_data.get("carbs", 0),
            "fat": user_data.get("fat", 0)
        }
    }

    # Return the formatted nutrition data as a JSON response
    return {"nutrition_plan": nutrition_data}

# Dining hall URLs
DINING_LOCATIONS = {
    "marciano": "https://www.bu.edu/dining/location/marciano/#menu",
    "warren": "https://www.bu.edu/dining/location/warren/#menu",
    "west": "https://www.bu.edu/dining/location/west/#menu",
    "granby": "https://www.bu.edu/dining/location/granby/#menu"
}

def get_meal_periods(date_obj):
    is_weekend = date_obj.weekday() >= 5
    return ['brunch', 'dinner'] if is_weekend else ['breakfast', 'lunch', 'dinner']

@app.post("/run-python")
async def generate_meal_plan(request: Request):
    body = await request.json()
    
    # Parse the user input from the request body
    weight_kg = float(body.get("weight"))
    height_cm = float(body.get("height"))
    age = int(body.get("age"))
    gender = body.get("gender")
    activity_level = body.get("activity_level")
    weight_loss_goal_kg = float(body.get("weight_loss_goal"))
    dining_hall = body.get('dining_hall').lower()  # Ensure the key is lowercase to match DINING_LOCATIONS

    # Check if dining hall is valid
    if dining_hall not in DINING_LOCATIONS:
        raise HTTPException(status_code=400, detail="Invalid dining hall selection")

    # Generate nutrition plan using kg and cm directly
    nutrition_plan = get_nutrition_plan(weight_kg, height_cm, age, gender, activity_level, weight_loss_goal_kg)
    url = DINING_LOCATIONS[dining_hall]
    date_today = date.today()

    # Determine meal periods based on the day
    meal_periods = get_meal_periods(date_today)

    # Create daily meal plan
    daily_meal_plan = create_daily_plan(url, nutrition_plan, meal_periods, date_today, dining_hall)

    return {"meal_plan": daily_meal_plan}