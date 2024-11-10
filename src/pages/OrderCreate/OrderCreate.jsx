import React, { useState } from 'react';
import Food from '../../images/food.jpg';
import Drink from '../../images/drink.jpg';
import Fruit from '../../images/fruit.jpg';
import FoodIcon from '../../images/foodicon.png'
import MenuList_Order from './assets/MenuList_Order';
import MenuItemSelected from './assets/MenuItemSelected';
import CartSummary from './assets/CartSummary';
import './OrderCreate.css';

const OrderCreate = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [note, setNote] = useState('');

    const [menuItems] = useState([
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
            category: 'เมนูสเปเชียล',
            image: Fruit,
            price: 1000,
            ingredients: [],
        },
        {
            name: 'อาหารและเครื่องดื่ม 1',
            sizes: ['ทดสอบ'],
            category: 'ของทานเล่น, ผลไม้',
            image: FoodIcon,
            price: 1000,
            ingredients: [],
        },
        {
            name: 'อาหารและเครื่องดื่ม 2',
            sizes: ['ทดสอบ'],
            category: 'ของทานเล่น, ผลไม้',
            image: FoodIcon,
            price: 1000,
            ingredients: [],
        },
        {
            name: 'อาหารและเครื่องดื่ม 3',
            sizes: ['ทดสอบ'],
            category: 'ของทานเล่น, ผลไม้',
            image: FoodIcon,
            price: 1000,
            ingredients: [],
        },
        {
            name: 'อาหารและเครื่องดื่ม 4',
            sizes: ['ทดสอบ'],
            category: 'ของทานเล่น, ผลไม้',
            image: FoodIcon,
            price: 1000,
            ingredients: [],
        }
    ]);

    const handleMenuClick = (item) => {
        setSelectedItem(item);
        setSelectedSize(item.sizes[0]);
        setQuantity(1);
        setNote('');
    };

    const handleSizeChange = (size) => {
        setSelectedSize(size);
    };


    const handleQuantityIncrease = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleQuantityDecrease = () => {
        setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };


    const handleConfirmAdd = () => {
        if (selectedItem && selectedSize) {
            const newItem = {
                ...selectedItem,
                size: selectedSize,
                quantity: quantity,
                note: note,
            };
            setCartItems([...cartItems, newItem]);
            setSelectedItem(null);
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
        setNote(itemToEdit.note);
        setCartItems(cartItems.filter((_, index) => index !== indexToEdit));
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
                    <MenuItemSelected
                        selectedItem={selectedItem}
                        selectedSize={selectedSize}
                        quantity={quantity}
                        note={note}
                        handleSizeChange={handleSizeChange}
                        handleQuantityIncrease={handleQuantityIncrease}
                        handleQuantityDecrease={handleQuantityDecrease}
                        handleConfirmAdd={handleConfirmAdd}
                        setNote={setNote}
                    />
                ) : (
                    <CartSummary
                        cartItems={cartItems}
                        totalPrice={totalPrice}
                        handleEditItem={handleEditItem}
                        handleRemoveItem={handleRemoveItem}
                    />
                )}
            </div>
        </div>
    );
};

export default OrderCreate;
