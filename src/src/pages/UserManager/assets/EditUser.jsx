// EditUser.js
import React, { useState } from 'react';

const EditUser = ({ user, onClose, onSave }) => {
    const [editedUser, setEditedUser] = useState(user);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    const handleSave = () => {
        onSave(editedUser);
    };

    return (
        <div className="right-box">
            <div className='fs-20 fw-5 text-center'>แก้ไขผู้ใช้งาน</div>
            <label>ID</label>
            <input
                type="text"
                name="id"
                value={editedUser.id}
                onChange={handleChange}
                readOnly
            />
            <label>Name</label>
            <input
                type="text"
                name="name"
                value={editedUser.name}
                onChange={handleChange}
            />
            <label>Nickname</label>
            <input
                type="text"
                name="nickname"
                value={editedUser.nickname}
                onChange={handleChange}
            />
            <label>Role</label>
            <input
                type="text"
                name="roll"
                value={editedUser.roll}
                onChange={handleChange}
            />
            <label>Status</label>
            <select
                name="status"
                value={editedUser.status}
                onChange={handleChange}
            >
                <option value="online">Online</option>
                <option value="offline">Offline</option>
            </select>
            <label>Phone</label>
            <input
                type="text"
                name="phone"
                value={editedUser.phone || ''}
                onChange={handleChange}
            />
            <button className='blue-button'>บันทึก</button>
            <button className='red-button'>ยกเลิก</button>
        </div>
    );
};

export default EditUser;
