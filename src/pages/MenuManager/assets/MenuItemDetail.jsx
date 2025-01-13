import React, { useState } from 'react';

const MenuItemDetail = ({ selectedItem }) => {
    const [selectedSize, setSelectedSize] = useState(selectedItem.sizes[0]);

    const handleSizeClick = (size) => {
        setSelectedSize(size);
    };

    return (
        <div className="menu-details fs-18">
            <div className="right-box-header">
                <div className="fs-24 fw-5 text-black">{selectedItem.name}</div>
                <div className="fs-16 text-dark-grey">{selectedItem.category}</div>
            </div>

            <div className="right-box-header">
                <img src={selectedItem.image} alt={selectedItem.name} className="item-image" />
            </div>

            <div className='filter-bubble-container'>
                {selectedItem.sizes.map((size, index) => (
                    <button
                        key={index}
                        className={`filter-bubble ${selectedSize === size ? 'active' : ''}`}
                        onClick={() => handleSizeClick(size)}
                        style={{ marginTop: '10px' }}
                    >
                        {size.name}
                    </button>
                ))}
            </div>
            <div className='right-box-header'>
                {selectedSize && (
                    <>
                        <div>ราคา: {selectedSize.price} บาท</div>
                        <div>วัตถุดิบ:</div>
                        <ul className="ingredient-ul">
                            {selectedSize.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    </>
                )}
            </div>

            {/* โชว์ option */}


            <div className="menu-action-buttons">
                <button className="blue-button">แก้ไขรายละเอียด</button>
                <button className="red-button">ลบเมนูทิ้ง</button>
            </div>
        </div>
    );
};

export default MenuItemDetail;
