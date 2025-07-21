// App.js
import React, { useState, createContext } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ThemeContext = createContext();

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleTheme = () => setDarkMode(!darkMode);
  const location = useLocation();

  const isFormPage = ["/", "/login", "/signup", "/forgot-password"].includes(location.pathname) || location.pathname.startsWith("/reset-password");

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <div className={`app-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
     

        {!isFormPage && (
  <div className="top-controls">
    <button className="export-btn" onClick={() => window.dispatchEvent(new Event('triggerExportCSV'))}>
              ⬇️ Export CSV
            </button>
             <button className="btn toggle-btn" onClick={toggleTheme}>
              {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>
        )}

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
