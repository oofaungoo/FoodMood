import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import { HiViewGrid, HiTable, HiDatabase, HiUserGroup, HiDocumentReport, HiLogout, HiInbox, HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const Sidebar = () => {
    const location = useLocation();
    const [activeMenu, setActiveMenu] = useState('');
    const [isExpanded, setIsExpanded] = useState(true);

    const adminMenu = [
        { to: '/OrderCreate', label: 'สร้างออเดอร์', icon: <HiViewGrid /> },
        { to: '/OrderCheck', label: 'ออร์เดอร์ปัจจุบัน', icon: <HiViewGrid /> },
        { to: '/', label: 'จัดการวัตถุดิบ', icon: <HiInbox /> }, // เติมลิงก์ด้วย
        { to: '/', label: 'รายงาน', icon: <HiDocumentReport /> }, // เติมลิงก์ด้วย
        { to: '/Dashboard', label: 'Dashboard', icon: <HiTable /> },
        { to: '/MenuManager', label: 'จัดการเมนูอาหาร', icon: <HiDatabase /> },
        { to: '/UserManager', label: 'จัดการผู้ใช้', icon: <HiUserGroup /> },
    ];

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
    };

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    // Use useEffect to update activeMenu based on the current URL
    useEffect(() => {
        const currentPath = location.pathname;
        const activeItem = adminMenu.find(item => item.to === currentPath);
        if (activeItem) {
            setActiveMenu(activeItem.label);
        }
    }, [location.pathname, adminMenu]);

    return (
        <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`} id='sidebar'>
            <div className='sidebar-header'>
                <div className='fw-5 fs-24 text-blue' style={{ margin: '20px 0px 20px 0px' }}>
                    {isExpanded && "FoodMood."}
                </div>
                <button className="toggle-button" onClick={toggleSidebar}>
                    {isExpanded ? <HiChevronLeft /> : <HiChevronRight />}
                </button>
            </div>
            <ul>
                {adminMenu.map((item) => (
                    <Link to={item.to} key={item.label}>
                        <li className={activeMenu === item.label ? 'active' : ''} onClick={() => handleMenuClick(item.label)}>
                            {item.icon} {isExpanded && item.label}
                        </li>
                    </Link>
                ))}
            </ul>
            <button className="sidebar-logout-button fs-16 text-white">
                <HiLogout className='icon' /> {isExpanded && 'ออกจากระบบ'}
            </button>
        </div>
    );
}

export default Sidebar;
