// import React from 'react';
import {
  FaCalendarDay,
  FaCalendarWeek,
  FaCalendarAlt,
  FaSignOutAlt
} from 'react-icons/fa';
import './Sidebar.css';
import '../../App.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ filter, onFilterChange }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      localStorage.removeItem('token'); // or sessionStorage.removeItem('token');
      navigate('/login');
    }
  };

  return (
    <div className="sidebar">
      <button
        className={`icon-btn ${filter === 'today' ? 'active' : ''}`}
        title="Today"
        onClick={() => onFilterChange('today')}
      >
        <FaCalendarDay />
      </button>
      <button
        className={`icon-btn ${filter === 'week' ? 'active' : ''}`}
        title="This Week"
        onClick={() => onFilterChange('week')}
      >
        <FaCalendarWeek />
      </button>
      <button
        className={`icon-btn ${filter === 'month' ? 'active' : ''}`}
        title="This Month"
        onClick={() => onFilterChange('month')}
      >
        <FaCalendarAlt />
      </button>

      {/* Logout icon fixed at bottom */}
      <div
        className="logout-btn"
        onClick={handleLogout}
        title="Logout"
      >
        <FaSignOutAlt />
      </div>
    </div>
  );
};

export default Sidebar;