import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const Home = () => {
    return (
        <main>
            <Sidebar />
            
            <Outlet />
        </main>
    );
}

export default Home;