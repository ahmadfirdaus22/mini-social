import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import AddStatus from './pages/status/add';
import './index.css';
import Show from './pages/status/show';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Dashboard from './pages/dashboard';
import EditStatus from './pages/status/edit';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
          <Route
          path='/dashboard'
          element={
            <Dashboard />
          }
          />
        <Route path="/register" element={<Register />}></Route>
        <Route path="/add-status" element={<AddStatus />}></Route>
        <Route path="/:username/status/:id" element={<Show />}></Route>
        <Route path="/edit-status/:id" element={<EditStatus />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
