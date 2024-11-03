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

# Access both databases explicitly
user_db = client['user_database']      # Database where user data will be stored
meal_db = client['meal_database']      # Database where meal data will be stored

user_collection = user_db['user_data'] # Collection for user data

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
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
    goal: str
    diningHall: str
    weightChange: float

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

# Dining hall URLs
DINING_LOCATIONS = {
    "marciano": "https://www.bu.edu/dining/location/marciano/#menu",
    "warren": "https://www.bu.edu/dining/location/warren/#menu",
    "west": "https://www.bu.edu/dining/location/west/#menu",
    "granby": "https://www.bu.edu/dining/location/granby/#menu"
}

@app.get("/api/dining-hall/{dining_hall}/{time_of_day}")
async def get_dining_hall_items(dining_hall: str, time_of_day: str):
    print("backend!")  # Debug print to confirm request is received

    # Validate dining hall selection
    if dining_hall not in DINING_LOCATIONS:
        raise HTTPException(status_code=400, detail="Invalid dining hall selection")

    # Access the correct collection based on the dining hall name
    collection_name = f"{dining_hall}_meals"  # e.g., "marciano_meals"
    today_date = date.today().isoformat()  # Today's date in "YYYY-MM-DD" format

    # Retrieve items for today's date and specified meal period
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
    user.pop("_id")  # Remove the MongoDB ID for cleaner data
    return user
