import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import './MenuManager.css';
import Food from '../../images/food.jpg';
import Drink from '../../images/drink.jpg';
import Fruit from '../../images/fruit.jpg';
import AddNewMenu from './assets/AddNewMenu';
import MenuItemDetail from './assets/MenuItemDetail';
import MenuList from './assets/MenuList';

const MenuManager = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [showAddMenu, setShowAddMenu] = useState(false);
    const [menuItems, setMenuItems] = useState([
        {
            name: 'ไก่ย่าง',
            sizes: ['เล็ก', 'กลาง', 'ใหญ่'],
            category: 'เมนูจานหลัก, ของทานเล่น',
            image: Food,
            price: '120',
            ingredients: ['ไก่ (ครึ่งตัว) 300 g'],
        },
        {
            name: 'ชาเขียว',
            sizes: ['ร้อน', 'เย็น', 'ปั่น'],
            category: 'เมนูจานหลัก, ของทานเล่น',
            image: Drink,
            price: '60',
            ingredients: ['นม 50 ml', 'ชาเขียว 10 g'],
        },
        {
            name: 'สตอร์เบอรี่มรกต',
            sizes: ['เมนูสเปเชียล'],
            category: 'ของทานเล่น, ผลไม้',
            image: Fruit,
            price: '1000',
            ingredients: [],
        }
    ]);

    const handleMenuClick = (item) => {
        setSelectedItem(item);
        setShowAddMenu(false);
    };

    const toggleAddMenu = () => {
        setShowAddMenu(true);
        setSelectedItem(null);
    };

    const handleSaveNewMenu = (newMenuData) => {
        setMenuItems(prevItems => [...prevItems, newMenuData]);
        setShowAddMenu(false);
    };

    return (
        <div className="menu-manager-container">
            <Sidebar />
            <main className="menu-manager">
                <MenuList
                    menuItems={menuItems}
                    onMenuClick={handleMenuClick}
                    onAddNewMenu={toggleAddMenu}
                    selectedItem={selectedItem}
                />
                {showAddMenu ? <AddNewMenu onSave={handleSaveNewMenu} onCancel={() => setShowAddMenu(false)} /> : null}
                {selectedItem && <MenuItemDetail selectedItem={selectedItem} />}
            </main>
        </div>
    );
};

export default MenuManager;
