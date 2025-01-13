import React, { useState } from 'react';
import { FaRegTrashAlt } from "react-icons/fa";

const CartSummary = ({ cartItems, totalPrice, handleEditItem, handleRemoveItem }) => {
    // States สำหรับการเลือกวิธีการรับอาหาร
    const [option, setOption] = useState('ยังไม่ระบุ');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [tableNumber, setTableNumber] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('ยังไม่จ่าย');
    const [paymentMethod, setPaymentMethod] = useState('เงินสด');

    // ฟังก์ชันจัดการการเปลี่ยนแปลงของ Dropdown
    const handleOptionChange = (e) => {
        setOption(e.target.value);
        setPhoneNumber('');
        setTableNumber('');
    };

    const handlePaymentStatusChange = (e) => {
        setPaymentStatus(e.target.value);
    };

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleConfirmOrder = () => {
        let finalTotal = totalPrice; // เริ่มต้นจาก totalPrice
    
        // ถ้าเลือก "สั่งแบบไม่ต้องจ่าย" ยอดรวมจะเป็น 0
        if (option === "สั่งแบบไม่ต้องจ่าย") {
            finalTotal = 0;
        }
    
        // แปลงข้อมูลรายการอาหารให้อยู่ในรูปแบบ food_count_list
        const foodCountList = cartItems.map(item => ({
            name: item.name,
            size: item.size,
            quantity: item.quantity,
        }));
    
        // กำหนด paid_option ตามตัวเลือกที่เลือก
        let paidOption = paymentMethod; // เริ่มต้นเป็นวิธีการชำระเงินที่เลือก
        if (option === "สั่งแบบไม่ต้องจ่าย") {
            paidOption = "ไม่ต้องจ่าย";
        }
    
        // แสดงผลใน console
        console.log({
            table_no: option === 'ทานที่ร้าน' ? tableNumber || 'ยังไม่ได้ระบุ' : null,
            food_count_list: foodCountList,
            cust_tel: option !== 'ทานที่ร้าน' ? phoneNumber || 'ยังไม่ได้ระบุ' : null,
            paid_option: paidOption,
        });
    
        console.log('ยอดรวม (Total):', finalTotal); // แสดงยอดรวม
    };

    return (
        <div className="cart-summary">

            <div className='right-box-header fs-26 fw-5 text-center'>
                ออเดอร์ที่ 47
            </div>

            {/* รายการสินค้า */}
            <ul>
                <div className='order-edit-del'>
                    <div className='fs-18 fw-5' style={{ marginTop: "10px" }}>รายการอาหารที่สั่ง</div>
                </div>

                {cartItems.map((item, index) => (
                    <li className='cart-item-column' style={{ marginTop: "5px" }} key={index}>
                        <div className="cart-item-details">
                            {/* แสดงจำนวนสินค้าในกล่องสี่เหลี่ยม */}
                            <span className="quantity-box">
                                {item.quantity}
                            </span>

                            {/* รายละเอียดของเมนู (ชื่อ, ขนาด, หมายเหตุ) */}
                            <div className="item-info">
                                <div className="item-name">{item.name}</div>
                                <div className="item-size-note fs-14">
                                    {item.size}
                                    {item.note && <div className='text-dark-grey'>หมายเหตุ: {item.note}</div>}
                                </div>
                            </div>

                            {/* ราคา */}
                            <span className="cart-item-price">{item.price * item.quantity}</span>
                        </div>

                        {/* ปุ่มแก้ไขและลบ */}
                        <div className='order-edit-del'>
                            <button onClick={() => handleEditItem(index)} className='text-blue invisible-btn fs-14 fw-5' style={{ marginLeft: "38px" }}>แก้ไข</button>
                            <button onClick={() => handleRemoveItem(index)} className='text-red invisible-btn fs-14 fw-5'><FaRegTrashAlt /></button>
                        </div>
                    </li>
                ))}

            </ul>
            <div className='right-box-header'>
                <div className="total-price fs-18 fw-5">
                    <span>ราคารวม:</span>
                    <span className='right'>{totalPrice}</span>
                </div>
            </div>

            {/* Dropdown สำหรับเลือกวิธีการรับอาหาร */}
            <div style={{ marginTop: "10px" }}>
                <label>ตัวเลือกการรับอาหาร: </label>
                <select value={option} onChange={handleOptionChange}>
                    <option value="ยังไม่ระบุ">ยังไม่ระบุ</option>
                    <option value="ทานที่ร้าน">🍽️ ทานที่ร้าน</option>
                    <option value="กลับบ้าน">🏠 กลับบ้าน</option>
                    <option value="Delivery">🚚 Delivery</option>
                    <option value="สั่งแบบไม่ต้องจ่าย">🎉 สั่งแบบไม่ต้องจ่าย</option>
                </select>
            </div>

            {/* Input สำหรับเบอร์โทรหรือหมายเลขโต๊ะ */}
            {option !== 'ทานที่ร้าน' && (
                <div style={{ marginTop: "10px" }}>
                    <label>เบอร์โทร: </label>
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="กรุณากรอกเบอร์โทร"
                    />
                </div>
            )}

            {option === 'ทานที่ร้าน' && (
                <div style={{ marginTop: "10px" }}>
                    <label>หมายเลขโต๊ะ: </label>
                    <input
                        type="text"
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        placeholder="กรุณากรอกหมายเลขโต๊ะ"
                    />
                </div>
            )}

            {/* ส่วนของยอดชำระเงิน 
            <div style={{ marginTop: "10px" }}>
                <label>สถานะการชำระเงิน: </label>
                <select value={paymentStatus} onChange={handlePaymentStatusChange}>
                    <option value="ยังไม่จ่าย">ยังไม่จ่าย</option>
                    <option value="จ่ายเลย">จ่ายเลย</option>
                </select>
            </div>

            
            paymentStatus === 'จ่ายเลย' && (
                <div>
                    <label>เลือกวิธีการชำระเงิน: </label>
                    <select value={paymentMethod} onChange={handlePaymentMethodChange}>
                        <option value="เงินสด">เงินสด</option>
                        <option value="โอนธนาคาร">โอนธนาคาร</option>
                    </select>
                </div>
            )}

            {paymentStatus === 'จ่ายเลย' && paymentMethod === 'โอนธนาคาร' && (
                <div>
                    <p>กรุณาสแกน QR Code เพื่อชำระเงิน</p>
                </div>
            )}
            */}

            <div style={{ marginTop: "10px" }}>
                <button onClick={handleConfirmOrder} className="blue-button">ยืนยันการสั่ง</button>
            </div>
        </div>
    );
};

export default CartSummary;
