import React, { useState } from 'react';
import { HiChevronRight, HiChevronLeft } from "react-icons/hi2";
import AddIngredient from './assets/AddIngredient';
import EditIngredient from './assets/EditIngredient';
import './IngredientManager.css';

const IngredientManager = () => {
    const [ingredients, setIngredients] = useState([
        { id: 1, name: 'ไก่ (น่อง)', active: true, category: 'เนื้อสัตว์', unit: 'กิโลกรัม', cnt: 4 },
        { id: 2, name: 'ใบเหลียง', active: true, category: 'ผัก', unit: 'กิโลกรัม', cnt: 3 },
        { id: 3, name: 'มะม่วง', active: true, category: 'ผลไม้', unit: 'กิโลกรัม', cnt: 1.8 },
        { id: 4, name: 'ผงชาไทย', active: true, category: 'เครื่องดื่ม', unit: 'กรัม', cnt: 500 },
        { id: 5, name: 'ไก่ (ครึ่งตัว)', active: true, category: 'เนื้อสัตว์', unit: 'ครึ่งตัว', cnt: 10 },
        { id: 6, name: 'ไก่ (ทั้งตัว)', active: true, category: 'เนื้อสัตว์', unit: 'ตัว', cnt: 5 },
        { id: 7, name: 'กุ้ง', active: true, category: 'ทะเล', unit: 'กิโลกรัม', cnt: 1.5 },
        { id: 8, name: 'มะละกอ (ดิบ)', active: true, category: 'ผลไม้', unit: 'กิโลกรัม', cnt: 10 },
        { id: 9, name: 'หน่อไม้ (อ่อน)', active: true, category: 'ผัก', unit: 'กิโลกรัม', cnt: 6 },
        { id: 10, name: 'หมู (สามชั้น)', active: true, category: 'เนื้อสัตว์', unit: 'กิโลกรัม', cnt: 6 },
        { id: 11, name: 'หมู (คอหมู)', active: true, category: 'เนื้อสัตว์', unit: 'กิโลกรัม', cnt: 9.8 },
        { id: 12, name: 'หมู (สับ)', active: true, category: 'เนื้อสัตว์', unit: 'กิโลกรัม', cnt: 11 },
        { id: 13, name: 'หมู (สันใน)', active: true, category: 'เนื้อสัตว์', unit: 'กิโลกรัม', cnt: 8 },
    ]);
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [showAddIngredient, setShowAddIngredient] = useState(false);
    const [showEditIngredient, setShowEditIngredient] = useState(false); 
    const [ingredientToEdit, setIngredientToEdit] = useState(null); 
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 8;

    const handleSearch = (e) => setSearch(e.target.value.toLowerCase());
    const handleCategoryFilter = (e) => setCategoryFilter(e.target.value);

    const filteredIngredients = ingredients.filter(ingredient =>
        ingredient.name.toLowerCase().includes(search) &&
        (categoryFilter ? ingredient.category === categoryFilter : true)
    );

    const toggleAddIngredient = () => {
        setShowAddIngredient(!showAddIngredient); 
    };

    const totalPages = Math.ceil(filteredIngredients.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedIngredients = filteredIngredients.slice(startIndex, startIndex + itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleBeforePage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleEditIngredient = (ingredient) => {
        setIngredientToEdit(ingredient);
        setShowEditIngredient(true); 
    };

    return (
        <div className='container'>
            <div className="middle-box">
                <input
                    type="text"
                    placeholder="ค้นหาวัตถุดิบ"
                    className="search-bar"
                    onChange={handleSearch}
                    value={search}
                />

                <div className="filter-button-container" style={{ marginTop: '10px' }}>
                    <select className="category-filter" onChange={handleCategoryFilter} value={categoryFilter}>
                        <option value="">เลือก Category ที่ต้องการ</option>
                        <option value="เนื้อสัตว์">เนื้อสัตว์</option>
                        <option value="ผัก">ผัก</option>
                        <option value="ทะเล">ทะเล</option>
                        <option value="เครื่องดื่ม">เครื่องดื่ม</option>
                        <option value="ผลไม้">ผลไม้</option>
                    </select>
                    <div className="blue-button" onClick={toggleAddIngredient}>
                        เพิ่มวัตถุดิบใหม่
                    </div>
                </div>

                <table className="ingredient-table">
                    <thead>
                        <tr>
                            <th><input type="checkbox" /></th>
                            <th>ชื่อวัตถุดิบ</th>
                            <th>หมวดหมู่</th>
                            <th>คงเหลือ</th>
                            <th>หน่วย</th>
                            <th>Active</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedIngredients.map(ingredient => (
                            <tr key={ingredient.id}>
                                <td><input type="checkbox" /></td>
                                <td>{ingredient.name}</td>
                                <td>{ingredient.category}</td>
                                <td>{ingredient.cnt}</td>
                                <td>{ingredient.unit}</td>
                                <td>{ingredient.active ? '✔️' : '❌'}</td>
                                <td>
                                    <button className="edit-btn" onClick={() => handleEditIngredient(ingredient)}>✏️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="pagination">
                    {currentPage > 1 && (
                        <div onClick={handleBeforePage}><HiChevronLeft /></div>
                    )}
                    <span>หน้าที่ {currentPage} จาก {totalPages}</span>
                    {currentPage < totalPages && (
                        <div onClick={handleNextPage}><HiChevronRight /></div>
                    )}
                </div>
            </div>
            {showAddIngredient && <AddIngredient onClose={() => setShowAddIngredient(false)} />}
            {showEditIngredient && (
                <EditIngredient 
                    ingredient={ingredientToEdit} 
                    onClose={() => setShowEditIngredient(false)} 
                    onSave={(updatedIngredient) => {
                        setIngredients(prevIngredients => 
                            prevIngredients.map(ingredient => 
                                ingredient.id === updatedIngredient.id ? updatedIngredient : ingredient
                            )
                        );
                        setShowEditIngredient(false);
                    }}
                />
            )}
        </div>
    );
};

export default IngredientManager;