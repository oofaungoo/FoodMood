import React, { useState } from 'react';
import { HiPlusCircle } from "react-icons/hi";
import './AddNewMenu.css';
import AddIngredient from './AddIngredient';

const AddNewMenu = ({ onCancel }) => {
    const [menuName, setMenuName] = useState('');
    const [category, setCategory] = useState('mainDish');
    const [sizePrices, setSizePrices] = useState([]);
    const [newSize, setNewSize] = useState('');
    const [newSizePrice, setNewSizePrice] = useState('');
    const [imagePreview, setImagePreview] = useState(null);

    const [ingredientScreen, setIngredientScreen] = useState(false);
    const [currentSize, setCurrentSize] = useState(null);
    const [ingredientsBySize, setIngredientsBySize] = useState({});

    const [newIngredient, setNewIngredient] = useState('');
    const [newIngredientQty, setNewIngredientQty] = useState('');
    const [unit, setUnit] = useState('kg');

    const [customOptions, setCustomOptions] = useState([]);
    const [newLabel, setNewLabel] = useState('');
    const [newOption, setNewOption] = useState('');
    const [isOptionVisible, setIsOptionVisible] = useState(false);

    const ingredientOptions = ['ข้าว', 'น้ำตาล', 'พริก', 'เกลือ'];

    // Handle image upload
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    // Add size and price
    const handleAddSizePrice = () => {
        if (newSize && newSizePrice) {
            setSizePrices([{ size: newSize, price: Number(newSizePrice) }, ...sizePrices]);
            setNewSize('');
            setNewSizePrice('');
        }
    };

    // Show ingredient screen
    const handleIngredientScreen = (size) => {
        setCurrentSize(size);
        setIngredientScreen(true);
    };

    // Add ingredient
    const handleAddIngredient = () => {
        if (newIngredient && newIngredientQty) {
            const newIngredients = ingredientsBySize[currentSize] || [];
            setIngredientsBySize({
                ...ingredientsBySize,
                [currentSize]: [
                    ...newIngredients,
                    { name: newIngredient, qty: newIngredientQty, unit },
                ],
            });
            setNewIngredient('');
            setNewIngredientQty('');
        }
    };

    // Add custom option
    const handleAddOption = () => {
        if (newLabel && newOption) {
            setCustomOptions([
                ...customOptions,
                { label: newLabel, options: newOption.split(',').map((opt) => opt.trim()) },
            ]);
            setNewLabel('');
            setNewOption('');
            setIsOptionVisible(false);
        }
    };

    return (
        <div className="right-box">
            {!ingredientScreen ? (
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="right-box-header text-center fs-18 fw-5">เพิ่มเมนูใหม่</div>

                    <div style={{ marginTop: "10px" }}>
                        <label>ชื่อเมนู</label>
                        <input
                            type="text"
                            placeholder="เช่น ผัดกระเพรา"
                            value={menuName}
                            onChange={(e) => setMenuName(e.target.value)}
                        />
                    </div>
                    <div style={{ marginTop: "10px" }}>
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
                    <div className="upload-img" style={{ marginTop: "10px" }} onClick={() => document.getElementById('fileInput').click()}>
                        {imagePreview ? (
                            <img src={imagePreview} alt="Uploaded" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            <>
                                <HiPlusCircle className="fs-60" />
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

                    <div style={{ marginTop: "10px" }}>
                        <label>ขนาดและราคา</label>
                        <div>
                            {sizePrices.map((item, index) => (
                                <div
                                    key={index}
                                    className="option-box"
                                    onClick={() => handleIngredientScreen(item.size)}
                                >
                                    {item.size} : {item.price} บาท
                                </div>
                            ))}
                        </div>
                        <div className="size-price-inputs" style={{ marginTop: "10px" }}>
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
                        <button type="button" className="blue-button text-center" style={{ marginTop: "10px" }} onClick={handleAddSizePrice}>
                            เพิ่มขนาดและราคา
                        </button>
                    </div>

                    <div className='right-box-header' />

                    {/* Custom Options */}
                    <div className="right-box-header">
                        <div>
                            {customOptions.map((item, index) => (
                                <div key={index} className="option-box">
                                    {item.label} : {item.options.join(', ')}
                                </div>
                            ))}
                        </div>
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
                </form>
            ) : (
                <AddIngredient
                    currentSize={currentSize}
                    ingredientsBySize={ingredientsBySize}
                    ingredientOptions={ingredientOptions}
                    onAddIngredient={(size, ingredient) => {
                        const newIngredients = ingredientsBySize[size] || [];
                        setIngredientsBySize({
                            ...ingredientsBySize,
                            [size]: [...newIngredients, ingredient],
                        });
                    }}
                    onBack={() => setIngredientScreen(false)}
                />
            )}
        </div>
    );
};

export default AddNewMenu;
