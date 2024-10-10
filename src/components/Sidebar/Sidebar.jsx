import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { HiViewGrid, HiTable, HiDatabase, HiUserGroup, HiDocumentReport, HiLogout, HiInbox, HiChevronLeft, HiChevronRight } from 'react-icons/hi';


const Sidebar = () => {
    const [activeMenu, setActiveMenu] = useState('สร้างออเดอร์');
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
                <Link to='/Create-Order'>
                    <li className={activeMenu === 'สร้างออเดอร์' ? 'active' : ''} onClick={() => handleMenuClick('สร้างออเดอร์')}>
                        <HiViewGrid /> {isExpanded && 'สร้างออเดอร์'}
                    </li>
                </Link>
                <Link to='/Order'>
                    <li className={activeMenu === 'ออร์เดอร์ปัจจุบัน' ? 'active' : ''} onClick={() => handleMenuClick('ออร์เดอร์ปัจจุบัน')}>
                        <HiViewGrid /> {isExpanded && 'ออร์เดอร์ปัจจุบัน'}
                    </li>
                </Link>
                <Link to='/'> {/* เติมด้วยนะ */}
                    <li className={activeMenu === 'จัดการวัตถุดิบ' ? 'active' : ''} onClick={() => handleMenuClick('จัดการวัตถุดิบ')}>
                        <HiInbox /> {isExpanded && 'จัดการวัตถุดิบ'}
                    </li>
                </Link>
                <Link to='/'> {/* เติมด้วยนะ */}
                    <li className={activeMenu === 'รายงาน' ? 'active' : ''} onClick={() => handleMenuClick('รายงาน')}>
                        <HiDocumentReport /> {isExpanded && 'รายงาน'}
                    </li>
                </Link>
                <Link to='/'>
                    <li className={activeMenu === 'Dashboard' ? 'active' : ''} onClick={() => handleMenuClick('Dashboard')}>
                        <HiTable /> {isExpanded && 'Dashboard'}
                    </li>
                </Link>
                <Link to='/Menu-Manager'>
                    <li className={activeMenu === 'จัดการเมนูอาหาร' ? 'active' : ''} onClick={() => handleMenuClick('จัดการเมนูอาหาร')}>
                        <HiDatabase /> {isExpanded && 'จัดการเมนูอาหาร'}
                    </li>
                </Link>
                <Link to='/User-Manager'>
                    <li className={activeMenu === 'จัดการผู้ใช้' ? 'active' : ''} onClick={() => handleMenuClick('จัดการผู้ใช้')}>
                        <HiUserGroup /> {isExpanded && 'จัดการผู้ใช้'}
                    </li>
                </Link>

            </ul>
            <button className="sidebar-logout-button fs-16 text-white">
                <HiLogout className='icon' /> {isExpanded && 'ออกจากระบบ'}
            </button>
        </div>
    );
}

export default Sidebar;
