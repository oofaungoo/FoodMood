import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import './index.css';
import Home from './pages/Home/Home';
import Order from './pages/Order/Order';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>  
      <Route path = "/" element = {<Order />} >

      </Route>
    </Routes>
  </BrowserRouter>
);
