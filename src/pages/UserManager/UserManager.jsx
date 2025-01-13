import React, { useState } from 'react';
import { HiChevronRight, HiChevronLeft } from "react-icons/hi2";
import './UserManager.css';
import '../IngredientManager/IngredientManager.css';
import EditUser from './assets/EditUser';
import UserTable from './assets/UserTable';

const UserManager = () => {
    const [data, setData] = useState([
        { id: 'e01', name: 'แพรทอง', roll: 'หัวหน้าพ่อครัว' },
        { id: 'e02', name: 'ปวริศ', roll: 'เคาท์เตอร์' },
        { id: 'e03', name: 'สมชาย', roll: 'พนักงานเสิร์ฟ' },
        { id: 'e00', name: 'นิรันดร์', roll: 'Owner' },
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [showEditUser, setShowEditUser] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const filteredData = data.filter(item =>
        item.id.includes(searchQuery) || item.name.includes(searchQuery)
    );

    const handleEditUser = (user) => {
        setUserToEdit(user);
        setIsEditing(true); // แก้ไขผู้ใช้
        setShowEditUser(true);
    };

    const handleAddNewUser = () => {
        setUserToEdit({ id: '', name: '', nickname: '', roll: '', status: 'offline', phone: '' });
        setIsEditing(false); // เพิ่มผู้ใช้ใหม่
        setShowEditUser(true);
    };

    const handleSaveUser = (updatedUser) => {
        if (isEditing) {
            setData(prevData =>
                prevData.map(user => user.id === updatedUser.id ? updatedUser : user)
            );
        } else {
            setData(prevData => [...prevData, updatedUser]);
        }
        setShowEditUser(false);
    };

    return (
        <div className='container'>
            <div className="middle-box">
                <div className="search-container">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="ค้นหาด้วยชื่อ"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="blue-button" onClick={handleAddNewUser}>เพิ่มผู้ใช้ใหม่</button>
                </div>
                <UserTable data={filteredData} onEdit={handleEditUser} />
            </div>
            {showEditUser && (
                <EditUser
                    user={userToEdit}
                    onClose={() => setShowEditUser(false)}
                    onSave={handleSaveUser}
                />
            )}
        </div>
    );
};

export default UserManager;