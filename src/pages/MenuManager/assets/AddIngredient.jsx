import React, { useState } from 'react';

const AddIngredient = ({
    currentSize,
    ingredientOptions,
    onUpdateSizeName,
    onUpdatePrice,
    onBack,
}) => {
    const [ingredients, setIngredients] = useState([
        { newIngredient: '', newIngredientQty: '', unit: 'kg' },
    ]);
    const [editedSizeName, setEditedSizeName] = useState(currentSize);
    const [editedPrice, setEditedPrice] = useState('');

    const handleAddMoreFields = () => {
        setIngredients([
            ...ingredients,
            { newIngredient: '', newIngredientQty: '', unit: 'kg' },
        ]);
    };

    const handleUpdateSizeName = () => {
        if (editedSizeName && editedSizeName !== currentSize) {
            onUpdateSizeName(currentSize, editedSizeName);
        }
    };

    const handleUpdatePrice = () => {
        if (editedPrice) {
            onUpdatePrice(editedSizeName, editedPrice);
        }
    };

    const updateIngredientField = (index, field, value) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index][field] = value;
        setIngredients(updatedIngredients);
    };

    const handleSave = () => {
        const dataToSave = {
            sizeName: editedSizeName,
            price: editedPrice,
            ingredients: ingredients.filter(ingredient => ingredient.newIngredient && ingredient.newIngredientQty),
        };
        console.log('Data to Save:', dataToSave);
    };

    return (
        <div>
            <div className="right-box-header text-center fs-18 fw-5">
                เพิ่มวัตถุดิบ
            </div>
            <div style={{ marginTop: "10px" }}>
                <label>ขนาด </label>
                <input
                    type="text"
                    value={editedSizeName}
                    onChange={(e) => setEditedSizeName(e.target.value)}
                    onBlur={handleUpdateSizeName} // Update size name on blur
                />
            </div>
            <div style={{ marginTop: "10px" }}>
                <label>ราคา </label>
                <input
                    type="number"
                    value={editedPrice}
                    placeholder="ระบุราคา"
                    onChange={(e) => setEditedPrice(e.target.value)}
                    onBlur={handleUpdatePrice} // Update price on blur
                />
            </div>
            <div style={{ marginTop: "10px" }}>
                <label>วัตถุดิบ</label>
                {ingredients.map((ingredient, index) => (
                    <div key={index} className="inline-elements" style={{ marginBottom: "10px" }}>
                        <select
                            className="form-select"
                            value={ingredient.newIngredient}
                            onChange={(e) =>
                                updateIngredientField(index, 'newIngredient', e.target.value)
                            }
                        >
                            <option value="">เลือกวัตถุดิบ</option>
                            {ingredientOptions.map((option, idx) => (
                                <option key={idx} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            placeholder="ปริมาณ"
                            value={ingredient.newIngredientQty}
                            onChange={(e) =>
                                updateIngredientField(index, 'newIngredientQty', e.target.value)
                            }
                        />
                        <select
                            value={ingredient.unit}
                            onChange={(e) =>
                                updateIngredientField(index, 'unit', e.target.value)
                            }
                        >
                            <option value="kg">กิโลกรัม</option>
                            <option value="g">กรัม</option>
                        </select>
                    </div>
                ))}
            </div>

            <div>
                <button className="circle-plus-btn" onClick={handleAddMoreFields}>+</button>
            </div>

            <div className="order-action-buttons">
                <button type="button" className="red-button" onClick={onBack}>
                    ย้อนกลับ
                </button>
                <button type="button" className="blue-button" onClick={handleSave}>
                    บันทึก
                </button>
            </div>
        </div>
    );
};

export default AddIngredient;
