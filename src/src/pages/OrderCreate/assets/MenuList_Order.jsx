import React from 'react';

const MenuList_Order = ({ menuItems, onMenuClick, onAddNewMenu, selectedItem }) => {
    return (
        <div className="middle-box">
            <div className="menu-list">
                {menuItems.map((item, index) => (
                    <div
                        key={index}
                        className={`menu-item ${selectedItem?.name === item.name ? 'selected' : ''}`}
                        onClick={() => onMenuClick(item)}
                    >
                        <img src={item.image} alt={item.name} />
                        <div className='fs-18 text-black'>{item.name}</div>
                        <div className='fs-15 text-dark-grey'>{item.sizes.join('/')}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MenuList_Order;