import React, { useState } from 'react';
import Food from '../../images/food.jpg';
import Drink from '../../images/drink.jpg';
import Fruit from '../../images/fruit.jpg';
import MenuList_Order from './assets/MenuList_Order';
import './OrderCreate.css'; // For the styles, assume the right-box styling will be done here

const OrderCreate = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [note, setNote] = useState(''); // เพิ่ม state สำหรับหมายเหตุ

    const [menuItems, setMenuItems] = useState([
        {
            name: 'ไก่ย่าง',
            sizes: ['เล็ก', 'กลาง', 'ใหญ่'],
            category: 'เมนูจานหลัก, ของทานเล่น',
            image: Food,
            price: 120,
            ingredients: ['ไก่ (ครึ่งตัว) 300 g'],
        },
        {
            name: 'ชาเขียว',
            sizes: ['ร้อน', 'เย็น', 'ปั่น'],
            category: 'เครื่องดื่ม',
            image: Drink,
            price: 60,
            ingredients: ['นม 50 ml', 'ชาเขียว 10 g'],
        },
        {
            name: 'สตอร์เบอรี่มรกต',
            sizes: ['เมนูสเปเชียล'],
            category: 'ของทานเล่น, ผลไม้',
            image: Fruit,
            price: 1000,
            ingredients: [],
        }
    ]);

    const handleMenuClick = (item) => {
        setSelectedItem(item);
        setSelectedSize(item.sizes[0]); // Default to first size
        setQuantity(1); // ตั้งค่าเริ่มต้นจำนวนเป็น 1
        setNote(''); // ล้างหมายเหตุเมื่อเปลี่ยนเมนู
    };

    const handleSizeChange = (size) => {
        setSelectedSize(size);
    };

    const handleQuantityChange = (e) => {
        const value = Math.max(1, Number(e.target.value)); // ทำให้จำนวนไม่น้อยกว่า 1
        setQuantity(value);
    };

    const handleConfirmAdd = () => {
        if (selectedItem && selectedSize) {
            const newItem = {
                ...selectedItem,
                size: selectedSize,
                quantity: quantity,
                note: note, // เพิ่ม note เข้าไปในรายการ
            };
            setCartItems([...cartItems, newItem]);
            setSelectedItem(null); // Clear selected item after adding
        }
    };

    const handleRemoveItem = (indexToRemove) => {
        setCartItems(cartItems.filter((_, index) => index !== indexToRemove));
    };

    const handleEditItem = (indexToEdit) => {
        const itemToEdit = cartItems[indexToEdit];
        setSelectedItem(itemToEdit);
        setSelectedSize(itemToEdit.size);
        setQuantity(itemToEdit.quantity);
        setNote(itemToEdit.note); // นำ note มาแก้ไข
        setCartItems(cartItems.filter((_, index) => index !== indexToEdit)); // Remove the item to edit it
    };

    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <div className='container'>
            <MenuList_Order
                menuItems={menuItems}
                onMenuClick={handleMenuClick}
                selectedItem={selectedItem}
            />

            <div className='right-box fr-18'>
                {selectedItem ? (
                    <div>
                        <div className='fs-24 fw-5'>{selectedItem.name}</div>
                        <img src={selectedItem.image} alt={selectedItem.name} className="item-image" />
                        <div>
                            <div>ขนาด:</div>
                            {selectedItem.sizes.map((size) => (
                                <label
                                    key={size}
                                    className={`option-box ${selectedSize === size ? 'selected' : ''}`}
                                    onClick={() => handleSizeChange(size)}
                                >
                                    <input
                                        type="radio"
                                        value={size}
                                        checked={selectedSize === size}
                                        onChange={() => handleSizeChange(size)}
                                    />
                                    {size}
                                </label>
                            ))}
                        </div>
                        <div>
                            <label>จำนวน: </label>
                            <input
                                type="number"
                                value={quantity}
                                min="1"
                                className='form-input' onChange={handleQuantityChange} />
                        </div>
                        <div className="note-section">
                            <label>หมายเหตุ: </label>
                            <textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="เช่น หวาน 50, ไม่ใส่ถั่ว"
                            />
                        </div>

                        <div className="menu-action-buttons">
                            <button className='red-button'>ยกเลิก</button>
                            <button className='blue-button' onClick={handleConfirmAdd}>เพิ่มเข้าคำสั่งซื้อ</button>
                        </div>
                    </div>
                ) : (
                    <div className="cart-summary">
                        <h2>รายการที่สั่ง</h2>
                        {cartItems.length > 0 ? (
                            <>
                                <ul>
                                    {cartItems.map((item, index) => (
                                        <li key={index}>
                                            <div className="cart-item-details">
                                                <span>{item.name} ({item.size}) x{item.quantity}</span>
                                                <span className="cart-item-price">{item.price * item.quantity} บาท</span>
                                            </div>
                                            {item.note && <p className="cart-item-note">หมายเหตุ: {item.note}</p>}
                                            <button onClick={() => handleEditItem(index)} className='red-text'>แก้ไข</button>
                                            <button onClick={() => handleRemoveItem(index)} className='red-text'>ลบ</button>
                                        </li>
                                    ))}
                                </ul>
                                <div className="total-price">
                                    ราคารวม: {totalPrice} บาท
                                </div>
                            </>
                        ) : (
                            <p>ยังไม่มีรายการสั่งซื้อ</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderCreate;
