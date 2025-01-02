// UserTable.js
import React from 'react';

const UserTable = ({ data = [], onEdit }) => {
    return (
        <table className="ingredient-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>ชื่อ</th>
                    <th>ชื่อเล่น</th>
                    <th>ตำแหน่ง</th>
                    <th>สถานะ</th>
                    <th>เบอร์โทร</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                {data.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.nickname}</td>
                        <td>{user.roll}</td>
                        <td>{user.status}</td>
                        <td>{user.phone || 'N/A'}</td>
                        <td>
                            <button className="edit-btn" onClick={() => onEdit(user)}>✏️</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UserTable;