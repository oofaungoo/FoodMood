import React from 'react';

const MenuItemSelected = ({
    selectedItem,
    selectedSize,
    quantity,
    note,
    handleSizeChange,
    handleQuantityIncrease,
    handleQuantityDecrease,
    handleConfirmAdd,
    setNote
}) => {
    return (
        <div>
            <div className="right-box-header">
                <div className='fs-24 fw-5 text-black'>{selectedItem.name}</div>
                <div className='fs-16 text-dark-grey'>{selectedItem.category}</div>
            </div>
            <div className="right-box-header">
                <img src={selectedItem.image} alt={selectedItem.name} className="item-image" />
            </div>

            <ul>
                <li className="option-item">
                    <div>ขนาด</div>
                    <div>
                        {selectedItem.sizes.map((size) => (
                            <label
                                key={size}
                                className={`option-box ${selectedSize === size ? 'selected' : ''}`}
                                onClick={() => handleSizeChange(size)}
                            >
                                <input
                                    type="radio"
                                    value={size}
                                    checked={selectedSize === size}
                                    onChange={() => handleSizeChange(size)}
                                />
                                {size}
                            </label>
                        ))}
                    </div>
                </li>

                <li className="option-item">
                    <div>จำนวน</div>
                    <div className="quantity-div">
                        <button
                            onClick={handleQuantityDecrease}
                            className="quantity-left-btn"
                            disabled={quantity === 1}
                        >
                            -
                        </button>
                        <span>{quantity}</span>
                        <button onClick={handleQuantityIncrease} className="quantity-right-btn">+</button>
                    </div>
                </li>

                <li className="option-item-column">
                    <div style={{ marginTop: "8px" }}>รายละเอียดเพิ่มเติม</div>
                    <input
                        type="text"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="เช่น ไม่ใส่ถั่ว ไม่เอาผัก"
                        className="note-input"
                    />
                </li>
            </ul>

            <div className="menu-action-buttons">
                <button className='red-button'>ยกเลิก</button>
                <button className='blue-button' onClick={handleConfirmAdd}>เพิ่มเข้าคำสั่งซื้อ</button>
            </div>
        </div>
    );
};

export default MenuItemSelected;
