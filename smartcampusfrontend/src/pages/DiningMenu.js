// src/pages/DiningMenu.js
import GoHomeButton from '../Button/GoHomeButton';
const menu = [
  { day: 'Monday', items: ['Grilled Chicken', 'Veggie Pasta', 'Fruit Salad'] },
  { day: 'Tuesday', items: ['Beef Stir Fry', 'Rice & Beans', 'Yogurt Parfait'] },
  { day: 'Wednesday', items: ['Fish Tacos', 'Quinoa Salad', 'Apple Pie'] },
  { day: 'Thursday', items: ['Pasta Bolognese', 'Caesar Salad', 'Chocolate Mousse'] },
  { day: 'Friday', items: ['Pizza', 'Garden Salad', 'Ice Cream'] },
];

const DiningMenu = () => {
  return (
    <div className="page-container">
      <h1 style={{fontSize: '2rem',fontWeight: '700', color: '#000000',}}>Dining Menu</h1>
      <p className="page-subtitle">Check out what's on the menu this week</p>
      <div className="menu-grid">
        {menu.map((dayMenu, index) => (
          <div key={index} className="menu-card">
            <h3>{dayMenu.day}</h3>
            <ul>
              {dayMenu.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <GoHomeButton />
    </div>
  );
};

export default DiningMenu;
