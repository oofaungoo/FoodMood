import React from 'react';

const AddIngredient = ({ onClose }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to add a new ingredient (e.g., update state in parent component)
        onClose(); // Close the add ingredient box after saving
    };

    return (
        <div className="right-box">
            <div className='fs-20 fw-5 right-box-header text-center' style={{ marginBottom: "10px" }}>เพิ่มวัตถุดิบใหม่</div>
            <form onSubmit={handleSubmit}>
                <label>ชื่อวัตถุดิบ</label>
                <input type="text" placeholder="ชื่อวัตถุดิบ เช่น น่องไก่ สะโพกไก่" style={{ marginBottom: "10px" }} required />
                <label>ชื่อวัตถุดิบ</label>
                <select style={{ marginBottom: "10px" }}>
                    <option value="">เลือกหมวดหมู่ (Category)</option>
                    <option value="เนื้อสัตว์">เนื้อสัตว์</option>
                    <option value="ผัก">ผัก</option>
                    <option value="ทะเล">ทะเล</option>
                    <option value="เครื่องดื่ม">เครื่องดื่ม</option>
                    <option value="ผลไม้">ผลไม้</option>
                </select>
                <label>จำนวนวัตถุดิบขั้นต่ำ</label>
                <div className='inline-elements'>
                    <input type="number" placeholder="จำนวนขั้นต่ำ" required />
                    <select>
                        <option value="kg">กิโลกรัม</option>
                        <option value="g">กรัม</option>
                    </select>
                </div>

                <div className='fs-14' style={{ marginBottom: "10px" }}>หากจำนวนวัตถุดิบคงเหลือในระบบน้อยกว่า จำนวนขั้นต่ำ ระบบจะทำการแจ้งเตือนผู้ใช้ให้ทราบ</div>
                <div className='order-action-buttons' style={{ marginTop: '10px' }}>
                    <button type="button" className="red-button">ยกเลิก</button>
                    <button type="submit" className="blue-button">บันทึก</button>
                </div>
            </form>
        </div>
    );
};

export default AddIngredient;
