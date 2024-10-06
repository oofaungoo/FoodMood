import React, { useState } from 'react';
import './Sidebar.css';
import { HiViewGrid, HiTable, HiDatabase, HiUserGroup, HiDocumentReport, HiLogout, HiInbox, HiChevronLeft, HiChevronRight } from 'react-icons/hi';


const Sidebar = () => {
    const [activeMenu, setActiveMenu] = useState('ออร์เดอร์ปัจจุบัน');
    const [isExpanded, setIsExpanded] = useState(true);

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
    };

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

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
                <li
                    className={activeMenu === 'ออร์เดอร์ปัจจุบัน' ? 'active' : ''}
                    onClick={() => handleMenuClick('ออร์เดอร์ปัจจุบัน')}
                >
                    <HiViewGrid /> {isExpanded && 'ออร์เดอร์ปัจจุบัน'}
                </li>
                <li
                    className={activeMenu === 'จัดการวัตถุดิบ' ? 'active' : ''}
                    onClick={() => handleMenuClick('จัดการวัตถุดิบ')}
                >
                    <HiInbox /> {isExpanded && 'จัดการวัตถุดิบ'}
                </li>
                <li
                    className={activeMenu === 'รายงาน' ? 'active' : ''}
                    onClick={() => handleMenuClick('รายงาน')}
                >
                    <HiDocumentReport /> {isExpanded && 'รายงาน'}
                </li>
                <li
                    className={activeMenu === 'Dashboard' ? 'active' : ''}
                    onClick={() => handleMenuClick('Dashboard')}
                >
                    <HiTable /> {isExpanded && 'Dashboard'}
                </li>
                <li
                    className={activeMenu === 'จัดการเมนูอาหาร' ? 'active' : ''}
                    onClick={() => handleMenuClick('จัดการเมนูอาหาร')}
                >
                    <HiDatabase /> {isExpanded && 'จัดการเมนูอาหาร'}
                </li>
                <li
                    className={activeMenu === 'จัดการผู้ใช้' ? 'active' : ''}
                    onClick={() => handleMenuClick('จัดการผู้ใช้')}
                >
                    <HiUserGroup /> {isExpanded && 'จัดการผู้ใช้'}
                </li>
            </ul>
            <button className="sidebar-logout-button fs-16 text-white">
                <HiLogout className='icon' /> {isExpanded && 'ออกจากระบบ'}
            </button>
        </div>
    );
}

export default Sidebar;
