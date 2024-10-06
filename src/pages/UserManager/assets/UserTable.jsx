import React from 'react';
import '../UserManager.css';

const UserTable = ({ filteredData }) => {
    return (
        <table className="results-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>ชื่อ</th>
                    <th>เครื่อง</th>
                    <th>status</th>
                </tr>
            </thead>
            <tbody>
                {filteredData.map((item, index) => (
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.device}</td>
                        <td style={{ color: item.status === 'online' ? 'green' : 'red' }}>
                            {item.status}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default UserTable;