import React, { useState } from 'react';
import { HiPlusCircle } from "react-icons/hi";
import { FaRegTrashAlt } from "react-icons/fa";
import './AddNewMenu.css';
import IngredientPopup from './IngredientPopup';

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

    const [ingredients, setIngredients] = useState([]); // Array of ingredients
    const [newIngredient, setNewIngredient] = useState('');
    const [newIngredientQty, setNewIngredientQty] = useState('');
    
    // State to control popup visibility
    const [isPopupVisible, setIsPopupVisible] = useState(false);

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
            setSizePrices([{ size: newSize, price: Number(newSizePrice) }, ...sizePrices]);
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
                setCustomOptions([{ label: newLabel, options: [newOption] }, ...customOptions]);
            }
            setNewOption('');
        }
    };

    // Add ingredient
    const handleAddIngredient = () => {
        if (newIngredient && newIngredientQty) {
            setIngredients([{ name: newIngredient, qty: newIngredientQty }, ...ingredients]);
            setNewIngredient('');
            setNewIngredientQty('');
        }
    };

    // Remove ingredient
    const handleRemoveIngredient = (index) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients.splice(index, 1);
        setIngredients(updatedIngredients);
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
            }, {}),
            ingredients
        };

        console.log('บันทึกข้อมูล:', formData);
    };

    // Show/Hide IngredientPopup
    const handleIngredientPopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    return (
        <div className="right-box">
            <form onSubmit={handleSave}>
                <div className="right-box-header text-center fs-18 fw-5">เพิ่มเมนูใหม่</div>

                <div>
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
                <div className="right-box-header">
                    <label>หมวดหมู่</label>
                    <select
                        className="form-select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="appetizer">ของทานเล่น</option>
                        <option value="alacarte">อาหารตามสั่ง</option>
                        <option value="isaan">อาหารอีสาน</option>
                        <option value="dessert">ของหวาน</option>
                    </select>
                </div>

                <div className="right-box-header">
                    <div>
                        <label>ขนาดและราคา</label>
                        <button
                            className="manage-ingredients-btn"
                            type="button"
                            onClick={handleIngredientPopup}
                        >
                            จัดการวัตถุดิบ
                        </button>
                        <div>
                            {sizePrices.map((item, index) => (
                                <div key={index} className="option-box">
                                    {item.size} : {item.price} บาท
                                </div>
                            ))}
                        </div>
                        <div className="size-price-inputs">
                            <input
                                type="text"
                                placeholder="ขนาด"
                                value={newSize}
                                onChange={(e) => setNewSize(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="ราคา"
                                value={newSizePrice}
                                onChange={(e) => setNewSizePrice(e.target.value)}
                            />
                        </div>
                        <button type="button" className="blue-button text-center" onClick={handleAddSizePrice}>
                            เพิ่มขนาดและราคา
                        </button>
                    </div>
                </div>
                <div className="right-box-header">
                    <div className="add-option-label">
                        <label style={{ marginTop: '8px', marginRight: '6px' }}>ตัวเลือกพิเศษ</label>
                        <button
                            type="button"
                            className="circle-plus-btn"
                            onClick={() => setIsOptionVisible(!isOptionVisible)}
                        >
                            +
                        </button>
                    </div>
                    <div>
                        {customOptions.map((item, index) => (
                            <div key={index} className="option-box">
                                {item.label} : {item.options.join(', ')}
                            </div>
                        ))}
                    </div>
                    {isOptionVisible && (
                        <div className="add-option-container">
                            <input
                                type="text"
                                placeholder="ชื่อหมวดหมู่ เช่น ระดับความหวาน"
                                value={newLabel}
                                onChange={(e) => setNewLabel(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="ตัวเลือก เช่น 0, 25, 50"
                                value={newOption}
                                onChange={(e) => setNewOption(e.target.value)}
                            />
                            <button type="button" className="blue-button" onClick={handleAddOption}>
                                เพิ่มตัวเลือก
                            </button>
                        </div>
                    )}
                </div>

                <div style={{ marginTop: "10px" }}>
                    <button type="submit" className="blue-button">บันทึก</button>
                    <button type="button" className="red-button" onClick={onCancel}>ยกเลิก</button>
                </div>
            </form>

            {/* IngredientPopup should only show when isPopupVisible is true */}
            {isPopupVisible && <IngredientPopup onClose={handleIngredientPopup} />}
        </div>
    );
};

export default AddNewMenu;
