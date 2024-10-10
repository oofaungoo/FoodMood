import React from 'react';
import { HiPlusSm } from "react-icons/hi";

const MenuList = ({ menuItems, onMenuClick, onAddNewMenu, selectedItem }) => {
    return (
        <div className="middle-box">
            <div className="menu-list">
                <div onClick={onAddNewMenu}>
                    <div className={`add-menu-list text-white ${selectedItem?.name === 'เพิ่มเมนูใหม่' ? 'selected' : ''}`}>
                        <div> <HiPlusSm className='fs-60' /> </div>
                        เพิ่มเมนูใหม่
                    </div>
                </div>
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

export default MenuList;