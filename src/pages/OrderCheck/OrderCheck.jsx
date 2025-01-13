import React, { useState } from 'react';
import OrderDetail from './assets/OrderDetail';
import './OrderCheck.css';

const OrderCheck = () => {
    const [orders, setOrders] = useState([
        {
            id: 41, status: 4, date: '2024-11-01', time: '10:30',
            items: [
                { name: 'ข้าวผัด', quantity: 1, category: 'food', note: ['ไม่ใส่ผัก'] },
                { name: 'ชาเขียว - ปั่น', quantity: 2, category: 'drink', note: [] }
            ]
        },
        {
            id: 42, status: 3, date: '2024-11-01', time: '10:45',
            items: [
                { name: 'ส้มตำ', quantity: 1, category: 'food', note: [] },
                { name: 'น้ำส้ม - ปั่น', quantity: 1, category: 'drink', note: [] }
            ]
        },
        {
            id: 43, status: 2, date: '2024-11-01', time: '11:00',
            items: [
                { name: 'ข้าวมันไก่', quantity: 2, category: 'food', note: ['ขอจานใหญ่'] },
                { name: 'น้ำมะนาว - ปั่น', quantity: 1, category: 'drink', note: ['ไม่หวาน'] }
            ]
        },
        {
            id: 44, status: 2, date: '2024-11-02', time: '12:00',
            items: [
                { name: 'เอสเฟรสโซ่', quantity: 1, category: 'food', note: ['ปั่น', 'หวาน 50'] },
                { name: 'ชาเย็น', quantity: 2, category: 'drink', note: ['ปั่น', 'หวาน 50'] }
            ]
        },
        {
            id: 45, status: 1, date: '2024-11-02', time: '12:00',
            items: [
                { name: 'ข้าวขาหมู', quantity: 1, category: 'food', note: ['ราดน้ำจิ้ม'] },
                { name: 'ชาเย็น', quantity: 2, category: 'drink', note: ['หวานปกติ'] }
            ]
        },
    ]);
    const [filterStatus, setFilterStatus] = useState(['all']);
    const [filterCategory, setFilterCategory] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const statusOptions = [
        { id: 'all', name: 'ทั้งหมด' },
        { id: 1, name: 'ยังไม่เริ่ม' },
        { id: 2, name: 'กำลังทำ' },
        { id: 3, name: 'พร้อมเสิร์ฟ' },
        { id: 4, name: 'เสร็จสิ้น' },
        { id: 5, name: 'ยกเลิก' },
    ];

    const categoryOptions = [
        { id: 'all', name: 'ทั้งหมด' },
        { id: 'food', name: 'อาหาร' },
        { id: 'drink', name: 'เครื่องดื่ม' },
    ];

    const handleStatusChange = (statusId) => {
        if (statusId === 'all') {
            setFilterStatus(['all']);
        } else {
            // If "ทั้งหมด" is selected, set to only "all", else add it to selected statuses
            if (filterStatus.includes('all')) {
                setFilterStatus([statusId]);
            } else {
                setFilterStatus(prev => prev.includes(statusId) ? prev.filter(id => id !== statusId) : [...prev, statusId]);
            }
        }
    };

    const filteredOrders = orders.filter(order => {
        // Filter by status
        if (filterStatus.includes('all') || filterStatus.includes(order.status)) {
            // Filter by category
            if (filterCategory === 'all') {
                return true;
            }
            return order.items.some(item => item.category === filterCategory);
        }
        return false;
    });

    const selectOrder = (order) => {
        setSelectedOrder(order);
    };

    const removeItem = (itemName) => {
        if (selectedOrder) {
            const updatedItems = selectedOrder.items.filter(item => item.name !== itemName);
            setSelectedOrder({ ...selectedOrder, items: updatedItems });
        }
    };

    return (
        <div className='container'>
            <div className="middle-box">
                <div>

                    {/* Search Bar */}
                    <div className='search-bar' style={{ marginBottom: "10px" }}>
                        <input
                            type='text'
                            placeholder='ค้นหาออเดอร์ (ด้วยหมายเลขโต๊ะ หรือ หมายเลขออเดอร์)'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    
                    {/* Status Filter */}
                    <div className="filter-bubble-container">
                        สถานะออเดอร์: 
                        {statusOptions.map(option => (
                            <div
                                key={option.id}
                                className={`filter-bubble ${filterStatus.includes(option.id) ? 'active' : ''}`}
                                onClick={() => handleStatusChange(option.id)}
                            >
                                {option.name}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order List */}
                <div className="order-list">
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map(order => (
                            <div key={order.id} className={`order-item status-${order.status}`} onClick={() => selectOrder(order)}>
                                <div className='right-box-header fs-20 fw-5 text-center'>ออเดอร์ที่ {order.id}</div>
                                <div>{statusOptions.find(option => option.id === order.status)?.name}</div>
                                <div>เวลาที่สั่ง: {order.time}</div>
                            </div>
                        ))
                    ) : (
                        <p>ไม่พบออเดอร์</p>
                    )}
                </div>
            </div>

            {/* Display OrderDetail if an order is selected */}
            {selectedOrder && (
                <div className='right-box'><OrderDetail
                    selectedOrder={selectedOrder}
                    removeItem={removeItem}
                    onClose={() => setSelectedOrder(null)}
                /></div>
            )}
        </div>
    );
};

export default OrderCheck;
