import React, { useState } from 'react';
import { HiPlusSm } from "react-icons/hi";

const MenuList = ({ menuItems, onMenuClick, onAddNewMenu, selectedItem }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    const filteredMenuItems = menuItems.filter(item => {
        const matchesCategory = categoryFilter ? item.category === categoryFilter : true;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const categories = ['อาหารตามสั่ง', 'อาหารอีสาน', 'เครื่องดื่ม', 'ของหวาน', 'อื่น ๆ'];

    return (
        <div className="middle-box">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="ค้นหาเมนู"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="filter-bubble-container" style={{ marginTop: '10px' }}>
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className={`filter-bubble ${categoryFilter === category ? 'active' : ''}`}
                        onClick={() => setCategoryFilter(categoryFilter === category ? '' : category)}
                    >
                        {category}
                    </div>
                ))}
            </div>

            <div className="menu-list">
                <div onClick={onAddNewMenu}>
                    <div className={`add-menu-list text-white ${selectedItem?.name === 'เพิ่มเมนูใหม่' ? 'selected' : ''}`}>
                        <div><HiPlusSm className='fs-60' /></div>
                        เพิ่มเมนูใหม่
                    </div>
                </div>
                {filteredMenuItems.map((item, index) => (
                    <div
                        key={index}
                        className={`menu-item ${selectedItem?.name === item.name ? 'selected' : ''}`}
                        onClick={() => onMenuClick(item)}
                    >
                        <img src={item.image} alt={item.name} />
                        <div className='fs-18 text-black'>{item.name}</div>
                        <div className='fs-15 text-dark-grey'>
                            {item.sizes.map(size => size.name).join('/')}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MenuList;
