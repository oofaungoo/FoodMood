import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import AppLayout from './AppLayout';
import OrderCreate from './pages/OrderCreate/OrderCreate';
import OrderCheck from './pages/OrderCheck/OrderCheck';
import IngredientManagement from './pages/IngredientManager/In2';
import MenuManager from './pages/MenuManager/MenuManager';
import UserManager from './pages/UserManager/UserManager';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<AppLayout />}>
          <Route path="OrderCreate" element={<OrderCreate />} />
          <Route path="OrderCheck" element={<OrderCheck />} />
          <Route path="IngredientManagement" element={<IngredientManagement />} />
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="MenuManager" element={<MenuManager />} />
          <Route path="UserManager" element={<UserManager />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
