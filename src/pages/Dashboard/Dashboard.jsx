import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import './Dashboard.css';

import Food from '../../images/food.jpg';
import Drink from '../../images/drink.jpg';
import Fruit from '../../images/fruit.jpg';
import Appetizer from '../../images/Appetizer.jpg';

const Dashboard = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const menuData = [
        { name: 'ไก่ย่าง', sales: 5000, category: 'main', image: Food },
        { name: 'ชาเขียว', sales: 3000, category: 'drinks', image: Drink },
        { name: 'สตอร์เบอร์รี่เค้ก', sales: 2000, category: 'desserts', image: Fruit },
        { name: 'ข้าวโพดอบเนย', sales: 4000, category: 'appetizers', image: Appetizer },
    ];

    const ingredientData = [
        { name: 'Chicken', purchased: 300, used: 250 },
        { name: 'Tea Leaves', purchased: 150, used: 120 },
        { name: 'Strawberries', purchased: 200, used: 180 },
        { name: 'Corn', purchased: 100, used: 90 },
    ];

    const filterOptions = [
        { label: 'All', value: 'all' },
        { label: 'Main Courses', value: 'main' },
        { label: 'Desserts', value: 'desserts' },
        { label: 'Appetizers', value: 'appetizers' },
        { label: 'Drinks', value: 'drinks' }
    ];

    const filteredMenuData = selectedCategory === 'all'
        ? menuData
        : menuData.filter(item => item.category === selectedCategory);

    const totalRevenue = filteredMenuData.reduce((acc, item) => acc + item.sales, 0);

    return (
        <div className="dashboard-container">
            <h1>Menu Dashboard</h1>
            <div className="filters">
                {filterOptions.map(option => (
                    <button
                        key={option.value}
                        onClick={() => setSelectedCategory(option.value)}
                        className={selectedCategory === option.value ? 'active-filter' : ''}
                    >
                        {option.label}
                    </button>
                ))}
            </div>

            <div className="charts">
                <div className="bar-chart">
                    <h2>Sales by Menu Item</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={filteredMenuData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="sales" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="pie-chart">
                    <h2>Total Revenue</h2>
                    <PieChart width={300} height={300}>
                        <Pie
                            data={[{ name: 'Total Revenue', value: totalRevenue }]}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            <Cell fill="#8884d8" />
                        </Pie>
                    </PieChart>
                </div>
            </div>

            <div className="ingredient-chart">
                <h2>Ingredients: Purchased vs Used</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={ingredientData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="purchased" fill="#8884d8" name="Purchased" />
                        <Bar dataKey="used" fill="#82ca9d" name="Used" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="best-selling">
                <h2>Best-Selling Items</h2>
                <ul className="best-selling-list">
                    {filteredMenuData
                        .sort((a, b) => b.sales - a.sales)
                        .map(item => (
                            <li key={item.name}>
                                <img src={item.image} alt={item.name} className="food-image" />
                                <span>{item.name} - {item.sales} ฿</span>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;