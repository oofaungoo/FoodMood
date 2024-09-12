import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import './MenuManager.css';
import Food from '../../images/food.jpg';
import Drink from '../../images/drink.jpg';
import Fruit from '../../images/fruit.jpg'

const MenuManager = () => {
    const [selectedItem, setSelectedItem] = useState(null);

    const menuItems = [
        {
            name: 'ไก่ย่าง',
            sizes: 'เล็ก/กลาง/ใหญ่',
            category: 'เมนูจานหลัก, ของทานเล่น',
            image: Food,
            price: '120',
            ingredients: ['ไก่ (ครึ่งตัว) 300g'],
        },
        {
            name: 'ชาเขียว',
            sizes: 'ร้อน/เย็น/ปั่น',
            category: 'เมนูจานหลัก, ของทานเล่น',
            image: Drink,
            price: '60',
            ingredients: ['นม 50ml, ชาเขียว 10g'],
        },
        {
            name: 'สตอร์เบอรี่มรกต',
            sizes: 'เมนูสเปเชียล',
            category: 'ของทานเล่น, ผลไม้',
            image: Fruit,
            price: '1000',
            ingredients: [],
        }
    ];

    return (
        <div className="menu-manager-container">
            <Sidebar />
            <main className="menu-manager">
                <div className='menu-list-container'>
                    <div className="menu-list">
                        <div
                            onClick={() => setSelectedItem({ name: 'เพิ่มเมนูใหม่' })}
                        >
                            <button>เพิ่มเมนู</button>
                        </div>
                        {menuItems.map((item, index) => (
                            <div
                                key={index}
                                className={`menu-item ${selectedItem?.name === item.name ? 'selected' : ''}`}
                                onClick={() => setSelectedItem(item)}
                            >
                                <img src={item.image} alt={item.name} />
                                <div className='fs-18 text-black'>{item.name}</div>
                                <div className='fs-15 text-grey'>{item.sizes}</div>
                                
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="menu-details">
                    {selectedItem ? (
                        <>
                            <div className='fs-24 fw-5'>{selectedItem.name}</div>
                            <div>หมวดหมู่: {selectedItem.category}</div>
                            <img src={selectedItem.image} alt={selectedItem.name} />
                            <div>
                                <button className="size-button">เล็ก</button>
                                <button className="size-button">กลาง</button>
                                <button className="size-button">ใหญ่</button>
                            </div>
                            <p>ราคา: <span className="price">{selectedItem.price} บาท</span></p>
                            <p>วัตถุดิบ:</p>
                            <ul>
                                {selectedItem.ingredients && selectedItem.ingredients.length > 0 ? (
                                    selectedItem.ingredients.map((ingredient, index) => (
                                        <li key={index}>{ingredient}</li>
                                    ))
                                ) : (
                                    <li>ไม่มีวัตถุดิบ</li>
                                )}
                            </ul>
                            <button className="edit-button">แก้ไขรายละเอียด</button>
                            <button className="delete-button">ลบเมนูทิ้ง</button>
                        </>
                    ) : (
                        <div>สตอเบอรี่มรกต</div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default MenuManager;
