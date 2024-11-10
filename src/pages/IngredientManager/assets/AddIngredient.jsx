import React from 'react';

const AddIngredient = ({ onClose }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to add a new ingredient (e.g., update state in parent component)
        onClose(); // Close the add ingredient box after saving
    };

    return (
        <div className="right-box">
            <div className='fs-20 fw-5 right-box-header text-center'>เพิ่มวัตถุดิบใหม่</div>
            <form onSubmit={handleSubmit} style={{marginTop:'10px'}}>
                <input type="text" placeholder="ชื่อวัตถุดิบ เช่น ปลานิล" required />
                <select>
                        <option value="">ระบุหมวดหมู่ (Category)</option>
                        <option value="เนื้อสัตว์">เนื้อสัตว์</option>
                        <option value="ผัก">ผัก</option>
                        <option value="ทะเล">ทะเล</option>
                        <option value="เครื่องดื่ม">เครื่องดื่ม</option>
                        <option value="ผลไม้">ผลไม้</option>
                    </select>
                <input type="text" placeholder="หน่วย เช่น กก. กิโลกรัม ml" required />
                <div >
                    <button type="submit" className="blue-button">บันทึก</button>
                    <button type="button" className="red-button">ยกเลิก</button>
                </div>
            </form>
        </div>
    );
};

export default AddIngredient;
