import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CatalogPage.css';

function CatalogPage() {
  const [items, setItems] = useState([]);
  const locationIcons = {
    "Bakery": "🍞",
    "Deli": "🥪",
    "Grill": "🍳",
    "Salad Bar": "🥗",
    "Vegan": "🌱",
    "Gluten Free Kitchen": "🌾",
    "Saute": "🍲",
    "Home Zone": "🏠",
    "Desserts": "🍰",
    "Kitchen": "🍲",
    "default": "🍽️" // Default icon if location is not specified
  };

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return 'breakfast';
    if (hour >= 12 && hour < 18) return 'lunch';
    return 'dinner';
  };

  useEffect(() => {
    const fetchItems = async () => {
      const timeOfDay = getTimeOfDay();
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/dining-hall/marciano/${timeOfDay}`);
        setItems(response.data.items);
      } catch (error) {
        console.error('Failed to fetch items:', error);
      }
    };
    fetchItems();
  }, []);

  // Group items by location
  const groupedItems = items.reduce((groups, item) => {
    const { location } = item;
    if (!groups[location]) {
      groups[location] = [];
    }
    groups[location].push(item);
    return groups;
  }, {});
  const [timeOfDay, setTimeOfDay] = useState(getTimeOfDay());

  return (
    <div className="catalog-page">
      <h1>What's on the menu for {timeOfDay}?</h1>
      <div className="catalog-list">
        {Object.keys(groupedItems).map((location) => (
          <div key={location} className="catalog-item-group">
            <details className="details">
              <summary>
                <span className="hamburger-icon">☰</span>
                <span className="location-name">{location}</span>
                <span className="location-icon">{locationIcons[location] || locationIcons.default}</span>
              </summary>
              <ul className="location-items">
                {groupedItems[location].map((item) => (
                  <li key={item._id} className="catalog-item">
                    <span className="item-name">{item.name}</span>
                    <span className="item-calories">{item.calories} kcal</span>
                  </li>
                ))}
              </ul>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CatalogPage;
