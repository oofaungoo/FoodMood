import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Home from './pages/Home/Home';
import OrderCreate from './pages/OrderCreate/OrderCreate';
import Order from './pages/Order/Order';
import MenuManager from './pages/MenuManager/MenuManager';
import UserManager from './pages/UserManager/UserManager';
import Dashboard from './pages/Dashboard/Dashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route path='Create-Order' element={<OrderCreate />} />
          <Route path='Order' element={<Order />} />
          <Route path='Dashboard' element={<Dashboard />} />
          <Route path='Menu-Manager' element={<MenuManager />} />
          <Route path='User-Manager' element={<UserManager />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
