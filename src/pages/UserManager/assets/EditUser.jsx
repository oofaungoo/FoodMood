// EditUser.js
import React, { useState } from 'react';

const EditUser = ({ user, onClose, onSave }) => {
    const [editedUser, setEditedUser] = useState(user);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    const handleSave = () => {
        if (!editedUser.id) {
            alert('กรุณากรอก ID');
            return;
        }
        onSave(editedUser);
    };

    return (
        <div className="right-box">
            <div className='fs-20 fw-5 text-center'>
                {user.id ? 'แก้ไขผู้ใช้งาน' : 'เพิ่มผู้ใช้ใหม่'}
            </div>
            <label>Username</label>
            <input
                type="text"
                name="id"
                value={editedUser.id}
                onChange={handleChange}
                readOnly={!!user.id} // ID แก้ไขไม่ได้หากอยู่ในโหมดแก้ไข
                style={{ marginBottom: '10px' }}
            />
            <label>ชื่อพนักงาน</label>
            <input
                type="text"
                name="name"
                value={editedUser.name}
                onChange={handleChange}
                style={{ marginBottom: '10px' }}
            />
            <label>ตำแหน่ง (Roll)</label>
            <input
                type="text"
                name="roll"
                value={editedUser.roll}
                onChange={handleChange}
                style={{ marginBottom: '10px' }}
            />
            <label>Status</label>
            <label>Phone</label>
            <input
                type="text"
                name="phone"
                value={editedUser.phone || ''}
                onChange={handleChange}
                style={{ marginBottom: '10px' }}
            />
            <div className='order-action-buttons'>
                <button className='blue-button' onClick={handleSave}>บันทึก</button>
                <button className='red-button' onClick={onClose}>ยกเลิก</button>
            </div>

        </div>
    );
};

export default EditUser;

