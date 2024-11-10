import React from 'react';

const MenuItemDetail = ({ selectedItem }) => {
    return (
        <div className="menu-details fs-18">
            <div className="right-box-header">
                <div className='fs-24 fw-5 text-black'>{selectedItem.name}</div>
                <div className='fs-16 text-dark-grey'>{selectedItem.category}</div>
            </div>

            <div className="right-box-header">
                <img src={selectedItem.image} alt={selectedItem.name} className="item-image" />
            </div>

            {selectedItem.sizes && selectedItem.sizes.length > 0 && (
                <div>
                    {selectedItem.sizes.map((size, index) => (
                        <button key={index} className="size-button" style={{marginTop: "10px"}}>{size}</button>
                    ))}
                </div>
            )}
            <div>ราคา {selectedItem.price} บาท</div>
            <div>วัตถุดิบ</div>
            <ul className='ingredient-ul'>
                {selectedItem.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <div className="menu-action-buttons">
                <button className='blue-button'>แก้ไขรายละเอียด</button>
                <button className='red-button'>ลบเมนูทิ้ง</button>
            </div>
        </div>
    );
};

export default MenuItemDetail;
