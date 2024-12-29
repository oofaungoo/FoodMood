import React, { useState } from 'react';
import { HiPlusCircle } from "react-icons/hi";
import './AddNewMenu.css';

const AddNewMenu = ({ onCancel }) => {
    const [menuName, setMenuName] = useState('');
    const [category, setCategory] = useState('mainDish');
    const [sizePrices, setSizePrices] = useState([]); // Array of size-price pairs
    const [customOptions, setCustomOptions] = useState([]);
    const [newSize, setNewSize] = useState('');
    const [newSizePrice, setNewSizePrice] = useState('');
    const [newLabel, setNewLabel] = useState('');
    const [newOption, setNewOption] = useState('');
    const [isOptionVisible, setIsOptionVisible] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    // Handle image upload
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    // Add size and price pair
    const handleAddSizePrice = () => {
        if (newSize && newSizePrice) {
            setSizePrices([...sizePrices, { size: newSize, price: Number(newSizePrice) }]);
            setNewSize('');
            setNewSizePrice('');
        }
    };

    // Add custom option
    const handleAddOption = () => {
        if (newLabel && newOption) {
            const existingLabel = customOptions.find(option => option.label === newLabel);
            if (existingLabel) {
                existingLabel.options.push(newOption);
                setCustomOptions([...customOptions]);
            } else {
                setCustomOptions([...customOptions, { label: newLabel, options: [newOption] }]);
            }
            setNewOption('');
        }
    };

    // Handle form submit
    const handleSave = (e) => {
        e.preventDefault();

        const formData = {
            name: menuName,
            category,
            size_price: sizePrices.reduce((acc, curr) => {
                acc[curr.size] = curr.price;
                return acc;
            }, {}),
            option: customOptions.reduce((acc, curr) => {
                acc[curr.label] = curr.options;
                return acc;
            }, {})
        };

        console.log('บันทึกข้อมูล:', formData);
    };

    return (
        <div className="right-box fs-18">
            <form onSubmit={handleSave}>
                <div className="right-box-header text-center fs-20 fw-5">เพิ่มเมนูใหม่</div>
                <div className="form-group">
                    <label>ชื่อเมนู</label>
                    <input
                        type="text"
                        placeholder="เช่น ผัดกระเพรา"
                        value={menuName}
                        onChange={(e) => setMenuName(e.target.value)}
                    />
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
                <div className="form-group size-price-container">
                    <div className="size-group">
                        <label>ขนาดและราคา</label>
                        <div className="size-boxes">
                            {sizePrices.map((item, index) => (
                                <div key={index} className="option-box">
                                    {item.size}: {item.price} บาท
                                </div>
                            ))}
                        </div>
                        <input
                            type="text"
                            placeholder="เพิ่มขนาด"
                            value={newSize}
                            onChange={(e) => setNewSize(e.target.value)}
                            className="form-input"
                        />
                        <input
                            type="number"
                            placeholder="ราคา"
                            value={newSizePrice}
                            onChange={(e) => setNewSizePrice(e.target.value)}
                            className="form-input"
                        />
                        <button type="button" className="add-option-btn" onClick={handleAddSizePrice}>
                            เพิ่มขนาดและราคา
                        </button>
                    </div>
                </div>
                <div className="form-group">
                    <div className="add-option-label">
                        <label style={{ marginTop: '8px', marginRight: '6px' }}>เพิ่มตัวเลือก</label>
                        <button
                            type="button"
                            className="circle-plus-btn"
                            onClick={() => setIsOptionVisible(!isOptionVisible)}
                        >
                            +
                        </button>
                    </div>

                    {isOptionVisible && (
                        <div className="add-option-container">
                            <input
                                type="text"
                                placeholder="ชื่อหมวด เช่น ระดับความหวาน"
                                value={newLabel}
                                onChange={(e) => setNewLabel(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="ตัวเลือก เช่น 0, 25, 50"
                                value={newOption}
                                onChange={(e) => setNewOption(e.target.value)}
                            />
                            <button type="button" className="add-option-btn" onClick={handleAddOption}>
                                เพิ่มตัวเลือก
                            </button>
                        </div>
                    )}
                </div>
                <div className="added-options">
                    {customOptions.map((item, index) => (
                        <div key={index} className="custom-option">
                            <h4>{item.label}:</h4>
                            <span>{item.options.join(', ')}</span>
                        </div>
                    ))}
                </div>
                <div>
                    <button type="submit" className="blue-button">บันทึก</button>
                    <button type="button" className="red-button" onClick={onCancel}>ยกเลิก</button>
                </div>
            </form>
        </div>
    );
};

export default AddNewMenu;
