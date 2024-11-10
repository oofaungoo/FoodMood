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
    const [isOptionVisible, setIsOptionVisible] = useState(false);  // State to control visibility of option inputs

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
                        <button type="button" className="add-option-btn" onClick={handleAddSize} style={{marginBottom: '10px'}}>
                            เพิ่มขนาด
                        </button>
                    </div>

                    <div className="price-group">
                        <label>ราคา</label>
                        <input
                            type="number"
                            placeholder="ราคา"
                            className="form-input"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
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
                                placeholder="ระดับความหวาน, ระดับความเผ็ด"
                                value={newLabel}
                                onChange={(e) => setNewLabel(e.target.value)}
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
                            <span>{item.option}</span>
                        </div>
                    ))}
                </div>
                <div >
                    <button type="submit" className="blue-button">บันทึก</button>
                    <button type="button" className="red-button" onClick={onCancel}>ยกเลิก</button>
                </div>
            </form>
        </div>
    );
};

export default AddNewMenu;
