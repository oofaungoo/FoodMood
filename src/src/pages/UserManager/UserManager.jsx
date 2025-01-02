import React, { useState } from 'react';
import { HiChevronRight, HiChevronLeft } from "react-icons/hi2";
import './UserManager.css';
import '../IngredientManager/IngredientManager.css';
import EditUser from './assets/EditUser';
import UserTable from './assets/UserTable';

const UserManager = () => {
    const [data, setData] = useState([
        { id: 'e01', name: 'แพรทอง', nickname: 'Kam', roll: 'หัวหน้าพ่อครัว', status: 'online' },
        { id: 'e02', name: 'ปวริศ', nickname: 'Fuang', roll: 'เคาท์เตอร์', status: 'online' },
        { id: 'e03', name: 'สมชาย', nickname: 'Joe', roll: 'พนังงานเสิร์ฟ', status: 'offline' },
        { id: 'e00', name: 'นิรันดร์', nickname: 'Nut', roll: 'Owner', status: 'offline' },
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [showEditUser, setShowEditUser] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);

    const filteredData = data.filter(item =>
        item.id.includes(searchQuery) || item.name.includes(searchQuery)
    );

    const handleEditUser = (user) => {
        setUserToEdit(user);
        setShowEditUser(true);
    };

    const handleSaveUser = (updatedUser) => {
        setData(prevData =>
            prevData.map(user => user.id === updatedUser.id ? updatedUser : user)
        );
        setShowEditUser(false);
    };

    return (
        <div className='container'>
            <div className="middle-box">
                <div className="search-container">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="ค้นรายชื่อ / ID"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="search-button">ค้นหา</button>
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