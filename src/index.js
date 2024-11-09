import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Home from './pages/Home/Home';
import OrderCreate from './pages/OrderCreate/OrderCreate';
import OrderCheck from './pages/OrderCheck/OrderCheck';
import MenuManager from './pages/MenuManager/MenuManager';
import UserManager from './pages/UserManager/UserManager';
import Dashboard from './pages/Dashboard/Dashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route path='OrderCreate' element={<OrderCreate />} />
          <Route path='OrderCheck' element={<OrderCheck />} />
          <Route path='Dashboard' element={<Dashboard />} />
          <Route path='MenuManager' element={<MenuManager />} />
          <Route path='UserManager' element={<UserManager />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
