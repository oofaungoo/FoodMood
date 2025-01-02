import React, { useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';  // Ensure you have this import for the trash icon

const IngredientPopup = ({ isIngredientsPopupVisible, setIsIngredientsPopupVisible }) => {
    const [ingredients, setIngredients] = useState([]); // Array to hold ingredients
    const [newIngredient, setNewIngredient] = useState('');
    const [newIngredientQty, setNewIngredientQty] = useState('');

    // Add a new ingredient to the list
    const handleAddIngredient = () => {
        if (newIngredient && newIngredientQty) {
            setIngredients([{ name: newIngredient, qty: newIngredientQty }, ...ingredients]);
            setNewIngredient('');
            setNewIngredientQty('');
        }
    };

    // Remove an ingredient from the list by its index
    const handleRemoveIngredient = (index) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients.splice(index, 1);
        setIngredients(updatedIngredients);
    };

    return (
        <div>
            {isIngredientsPopupVisible && (
                <div className="ingredients-popup">
                    <div className="popup-header">
                        <h3>จัดการวัตถุดิบ</h3>
                        <button
                            type="button"
                            className="close-btn"
                            onClick={() => setIsIngredientsPopupVisible(false)}
                        >
                            ✖
                        </button>
                    </div>
                    <div className="popup-body">
                        <div className="ingredients-list">
                            {ingredients.map((item, index) => (
                                <div key={index} className="ingredient-item">
                                    <span>{item.name} - {item.qty}</span>
                                    <button
                                        type="button"
                                        className="delete-btn"
                                        onClick={() => handleRemoveIngredient(index)}
                                    >
                                        <FaRegTrashAlt />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="ingredient-inputs">
                            <input
                                type="text"
                                placeholder="ชื่อวัตถุดิบ"
                                value={newIngredient}
                                onChange={(e) => setNewIngredient(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="จำนวน"
                                value={newIngredientQty}
                                onChange={(e) => setNewIngredientQty(e.target.value)}
                            />
                            <button
                                type="button"
                                className="add-ingredient-btn"
                                onClick={handleAddIngredient}
                            >
                                เพิ่มวัตถุดิบ
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IngredientPopup;
