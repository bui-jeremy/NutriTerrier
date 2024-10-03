import React from 'react';
import './MealPlanForm.css';

function MealPlanForm({ formData, handleChange, handleSubmit, loading }) {
    return (
        <form className="meal-plan-form" onSubmit={handleSubmit}>
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
    );
}

export default MealPlanForm;
