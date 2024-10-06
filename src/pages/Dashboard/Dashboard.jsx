import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';  
//เป็นตัวสำหรับทำกราฟต่าง ๆ https://recharts.org/en-US/api
import './Dashboard.css';

const Dashboard = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const menuData = [
        { name: 'ไก่ย่าง', sales: 5000, category: 'main' },
        { name: 'ชาเขียว', sales: 3000, category: 'drinks' },
        { name: 'สตอร์เบอร์รี่เค้ก', sales: 2000, category: 'desserts' },
        { name: 'ข้าวโพดอบเนย', sales: 4000, category: 'appetizers' },
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

            <div className="best-selling">
                <h2>Best-Selling Items</h2>
                <ul>
                    {filteredMenuData
                        .sort((a, b) => b.sales - a.sales)
                        .map(item => (
                            <li key={item.name}>{item.name} - {item.sales} ฿</li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
