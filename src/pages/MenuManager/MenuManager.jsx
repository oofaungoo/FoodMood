import React, { useState } from 'react';
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
            sizes: [
                { name: 'เล็ก', price: 80, ingredients: ['ไก่ (1/4 ตัว) 150 g'] },
                { name: 'กลาง', price: 120, ingredients: ['ไก่ (ครึ่งตัว) 300 g'] },
                { name: 'ใหญ่', price: 180, ingredients: ['ไก่ (ทั้งตัว) 600 g'] },
            ],
            category: 'เมนูจานหลัก, ของทานเล่น',
            image: Food,
        },
        {
            name: 'ชาเขียว',
            sizes: [
                { name: 'ร้อน', price: 50, ingredients: ['ชาเขียว 10 g', 'น้ำร้อน 100 ml'] },
                { name: 'เย็น', price: 60, ingredients: ['ชาเขียว 10 g', 'นมสด 50 ml'] },
                { name: 'ปั่น', price: 70, ingredients: ['ชาเขียว 10 g', 'นมสด 50 ml', 'น้ำแข็ง 100 g'] },
            ],
            category: 'เครื่องดื่ม',
            image: Drink,
        },
        {
            name: 'สตอร์เบอรี่มรกต',
            sizes: [
                { name: 'เมนูสเปเชียล', price: 1000, ingredients: ['สตอร์เบอรี่ 500 g', 'มรกต 50 g'] },
            ],
            category: 'ของทานเล่น, ผลไม้',
            image: Fruit,
        },
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
        <div className='container'>
            <MenuList
                menuItems={menuItems}
                onMenuClick={handleMenuClick}
                onAddNewMenu={toggleAddMenu}
                selectedItem={selectedItem}
            />
            {showAddMenu ? <AddNewMenu onSave={handleSaveNewMenu} onCancel={() => setShowAddMenu(false)} /> : null}
            {selectedItem && <MenuItemDetail selectedItem={selectedItem} />}
        </div>
    );
};

export default MenuManager;
