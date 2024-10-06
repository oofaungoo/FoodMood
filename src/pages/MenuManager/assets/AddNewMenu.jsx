import React, { useState } from 'react';
import { HiPlusCircle } from "react-icons/hi";
import './AddNewMenu.css';

const AddNewMenu = ({ onSave, onCancel }) => {

    const [imagePreview, setImagePreview] = useState(null);

    // Handle file input change
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);  // Set the base64 image data as the preview
            };
            reader.readAsDataURL(file);
        }
    };

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

                <div className='upload-img' onClick={() => document.getElementById('fileInput').click()}>
                    {imagePreview ? (
                        <img src={imagePreview} alt="Uploaded" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <>
                            <HiPlusCircle className='fs-60' />
                            อัปโหลดรูปภาพ
                        </>
                    )}
                </div>
                <input
                    id="fileInput"
                    type="file"
                    style={{ display: 'none' }}  // Hide the input element
                    accept="image/*"
                    onChange={handleImageUpload}
                />
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
                <div className="menu-action-buttons">
                    <button type="submit" className="blue-button">บันทึก</button>
                    <button type="button" className="red-button" onClick={onCancel}>ยกเลิก</button>
                </div>
            </form>
        </div >
    );
};

export default AddNewMenu;
