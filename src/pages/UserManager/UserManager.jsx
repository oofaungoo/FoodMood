import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import './UserManager.css';
import '../MenuManager/MenuManager.css';
import UserTable from './assets/UserTable';

const UserManager = () => {
    const [data, setData] = useState([
        { id: 'hu625699092', name: 'แพรทอง', device: 'lp2779', status: 'online' },
        { id: 'np625699092', name: 'ปวิศ', device: 'lp2779', status: 'online' },
        { id: 'xy625699092', name: 'สมชาย', device: 'lp2880', status: 'offline' },
    ]);

    const [searchQuery, setSearchQuery] = useState('');

    // ตัวค้นหา (query)
    const filteredData = data.filter(item =>
        item.id.includes(searchQuery) || item.name.includes(searchQuery)
    );

    return (
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

            {/* Use the ResultsTable component */}
            <UserTable filteredData={filteredData} />
        </div>
    );
};

export default UserManager;
