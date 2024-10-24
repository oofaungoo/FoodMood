import React, { useState } from 'react';
import { HiPlusCircle } from "react-icons/hi";
import './AddNewMenu.css';

const AddNewMenu = ({ onCancel }) => {
    const [menuName, setMenuName] = useState('');
    const [status, setStatus] = useState('available');
    const [category, setCategory] = useState('mainDish');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [customOptions, setCustomOptions] = useState([]);
    const [sizeOptions, setSizeOptions] = useState([]);
    const [newLabel, setNewLabel] = useState('');
    const [newOption, setNewOption] = useState('');
    const [newSize, setNewSize] = useState('');

    // Handle image upload
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    // Add custom option
    const handleAddOption = () => {
        if (newLabel && newOption) {
            setCustomOptions([{ label: newLabel, option: newOption }, ...customOptions]);
            setNewLabel('');
            setNewOption('');
        }
    };

    // Add size option
    const handleAddSize = () => {
        if (newSize) {
            setSizeOptions([newSize, ...sizeOptions]);
            setNewSize('');
        }
    };

    // Handle form submit
    const handleSave = (e) => {
        e.preventDefault();

        const formData = {
            menuName,
            status,
            category,
            price,
            quantity,
            sizes: sizeOptions,
            options: customOptions.reduce((acc, curr) => {
                if (!acc[curr.label]) {
                    acc[curr.label] = [];
                }
                acc[curr.label].push(curr.option);
                return acc;
            }, {})
        };

        console.log('Form Data:', formData);
    };

    return (
        <div className="right-box fs-18">
            <form onSubmit={handleSave}>
                <h2 className="form-title">เพิ่มเมนูใหม่</h2>
                <div className="form-group">
                    <label>ชื่อเมนู</label>
                    <input
                        type="text"
                        placeholder="ชื่อเมนู"
                        className="form-input"
                        value={menuName}
                        onChange={(e) => setMenuName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>สถานะ</label>
                    <select
                        className="form-select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
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
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handleImageUpload}
                />
                <div className="form-group">
                    <label>หมวดหมู่</label>
                    <select
                        className="form-select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="mainDish">เมนูจานหลัก</option>
                        <option value="appetizer">ของทานเล่น</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>ขนาด</label>
                    <div className="size-boxes">
                        {sizeOptions.map((size, index) => (
                            <div key={index} className="option-box">{size}</div>
                        ))}
                    </div>
                    <input
                        type="text"
                        placeholder="เพิ่มขนาด"
                        value={newSize}
                        onChange={(e) => setNewSize(e.target.value)}
                        className="form-input"
                    />
                    <button type="button" className="add-option-btn" onClick={handleAddSize}>
                        เพิ่มขนาด
                    </button>
                </div>
                <div className="form-group">
                    <label>ราคา</label>
                    <input
                        type="number"
                        placeholder="ราคา"
                        className="form-input"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>จำนวน</label>
                    <input
                        type="number"
                        placeholder="จำนวน"
                        className="form-input"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>เพิ่มตัวเลือก</label>
                    <input
                        type="text"
                        placeholder="ชื่อ Label"
                        value={newLabel}
                        onChange={(e) => setNewLabel(e.target.value)}
                        className="form-input"
                    />
                    <input
                        type="text"
                        placeholder="ตัวเลือก"
                        value={newOption}
                        onChange={(e) => setNewOption(e.target.value)}
                        className="form-input"
                    />
                    <button type="button" className="add-option-btn" onClick={handleAddOption}>
                        เพิ่มตัวเลือก
                    </button>
                </div>
                <div className="added-options">
                    {customOptions.map((item, index) => (
                        <div key={index} className="custom-option">
                            <h4>{item.label}:</h4>
                            <span>{item.option}</span>
                        </div>
                    ))}
                </div>
                <div className="menu-action-buttons">
                    <button type="submit" className="blue-button">บันทึก</button>
                    <button type="button" className="red-button" onClick={onCancel}>ยกเลิก</button>
                </div>
            </form>
        </div>
    );
};

export default AddNewMenu;
