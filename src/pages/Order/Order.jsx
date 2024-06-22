import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import './Order.css'

const Order = () => {
    return (
        <main>
            <Sidebar />
            <div>lวัสดจ้า</div>
            <Outlet />
        </main>
    );
}

export default Order;