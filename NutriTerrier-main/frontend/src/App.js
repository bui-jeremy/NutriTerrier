import React, { useState } from 'react';
import './App.css';

function App() {
    const [formData, setFormData] = useState({
        weight: '',
        height_ft: '',
        height_in: '',
        age: '',
        gender: 'male',
        activity_level: 'moderate',
        weight_loss_goal: ''
    });
    const [output, setOutput] = useState(null);  
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await fetch('http://localhost:8000/run-python', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                setOutput(data.meal_plan);  // Save parsed JSON response
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('An error occurred while generating the meal plan.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="Title">
            <h1>Daily Meal Plan Generator</h1>
            <div className="App">
                <form onSubmit={handleSubmit}>
                    <label>
                        Weight (lbs):
                        <input type="number" name="weight" value={formData.weight} onChange={handleChange} required />
                    </label>
                    <label>
                        Height (ft):
                        <input type="number" name="height_ft" value={formData.height_ft} onChange={handleChange} required />
                    </label>
                    <label>
                        Height (in):
                        <input type="number" name="height_in" value={formData.height_in} onChange={handleChange} required />
                    </label>
                    <label>
                        Age:
                        <input type="number" name="age" value={formData.age} onChange={handleChange} required />
                    </label>
                    <label>
                        Gender:
                        <select name="gender" value={formData.gender} onChange={handleChange} required>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </label>
                    <label>
                        Activity Level:
                        <select name="activity_level" value={formData.activity_level} onChange={handleChange} required>
                            <option value="sedentary">Sedentary</option>
                            <option value="light">Light</option>
                            <option value="moderate">Moderate</option>
                            <option value="very_active">Very Active</option>
                        </select>
                    </label>
                    <label>
                        Dining Hall:
                        <select name="dining_hall" value={formData.dining_hall} onChange={handleChange} required>
                            <option value="marciano">Marciano</option>
                            <option value="warren">Warren</option>
                            <option value="west">West</option>
                            <option value="granby">Granby</option>
                        </select>
                    </label>
                    <label>
                        Weight Loss Goal (lbs):
                        <input type="number" name="weight_loss_goal" value={formData.weight_loss_goal} onChange={handleChange} required />
                    </label>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Generating...' : 'Generate Meal Plan'}
                    </button>
                </form>

                {error && <p className="error">{error}</p>}

                {output && (
                    <div className="meal-plan-output">
                        <h2>Meal Plan</h2>
                        {["breakfast", "lunch", "dinner"].map(mealTime => (
                            <div key={mealTime}>
                                <h3>{mealTime.charAt(0).toUpperCase() + mealTime.slice(1)}</h3>
                                <ul>
                                    {output[mealTime].map((meal, index) => (
                                        <li key={index}>
                                            {/* Map through items if there are multiple foods */}
                                            {meal.items && meal.items.map((item, itemIndex) => (
                                                <span key={itemIndex}>
                                                    <strong>{item}</strong><br />
                                                </span>
                                            ))}
                                            <em>Location: {meal.location}</em>
                                            <br />
                                            Calories: {meal.calories} | Protein: {meal.protein}g | Carbs: {meal.carbs}g | Fat: {meal.fat}g
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
