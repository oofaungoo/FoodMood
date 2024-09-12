import React from 'react';
import { HiPlusCircle } from "react-icons/hi";
import './AddNewMenu.css';

const AddNewMenu = ({ onSave, onCancel }) => {
    return (
        <div className="menu-details fs-18">
            <form onSubmit={onSave}>
                <div className='fs-24 fw-5 text-center'>เพิ่มเมนูใหม่</div>
                <div>
                    <label>ชื่อเมนู: </label>
                    <input type="text" id="menuName" name="menuName" placeholder="ชื่อเมนู" className='form-input' />
                </div>
                <div>
                    <label>สถานะ: </label>
                    <select id="status" name="status" className='form-option'>
                        <option value="available">เปิดการขาย</option>
                        <option value="unavailable">ปิดการขาย</option>
                    </select>
                </div>

                <div className='upload-img'>
                    <HiPlusCircle className='fs-60' />
                    เพิ่มเมนูใหม่
                </div>
                <div>
                    <label >หมวดหมู่:</label>
                    <select id="category" name="category" className='form-option'>
                        <option value="mainDish">เมนูจานหลัก</option>
                        <option value="appetizer">ของทานเล่น</option>
                    </select>
                </div>
                <div>
                    <label>ขนาด:</label>
                    <select id="size" name="size" className='form-option'> 
                        <option value="s">เล็ก</option>
                        <option value="m">กลาง</option>
                        <option value="l">ใหญ่</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="price">ราคา:</label>
                    <input type="number" id="price" name="price" placeholder="ราคา" />
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">จำนวน:</label>
                    <input type="number" id="quantity" name="quantity" placeholder="จำนวน" defaultValue="500" />
                </div>
                <div className="form-buttons">
                    <button type="submit" className="submit-button">บันทึก</button>
                    <button type="button" className="cancel-button" onClick={onCancel}>ยกเลิก</button>
                </div>
            </form>
        </div >
    );
};

export default AddNewMenu;
