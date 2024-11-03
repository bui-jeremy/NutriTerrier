from pymongo import MongoClient

# Replace this with your actual MongoDB URI
MONGO_URI = "mongodb+srv://fayker:EpGWE4dn8s3Y2Iji@mealsscraped.v3i6m.mongodb.net/user_database?retryWrites=true&w=majority&tls=true&tlsAllowInvalidCertificates=true"

try:
    # Initialize MongoDB client with SSL configuration
    client = MongoClient(
        MONGO_URI,
        tls=True,
        tlsAllowInvalidCertificates=True
    )
    db = client['user_database']  # Specify your database
    print("Connected to MongoDB successfully!")
    
    # Test a sample query (optional)
    print("Testing query...")
    user = db['user_data'].find_one()
    print("Sample document:", user)
except Exception as e:
    print("Error connecting to MongoDB:", e)
