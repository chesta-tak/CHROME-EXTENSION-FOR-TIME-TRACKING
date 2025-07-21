// export default Dashboard;
// Dashboard.js
import React, { useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';
import { ThemeContext } from '../App';
import DashboardContent from './component/DashboardContent';
import Sidebar from './component/Sidebar';
import '../App.css';

const classifyCategory = (url) => {
  const productiveSites = ['google.com', 'stackoverflow.com', 'github.com'];
  const unproductiveSites = ['youtube.com', 'facebook.com', 'instagram.com'];
  if (productiveSites.some(site => url.includes(site))) return 'Productive';
  if (unproductiveSites.some(site => url.includes(site))) return 'Unproductive';
  return 'Neutral';
};

const Dashboard = () => {
  const { darkMode } = useContext(ThemeContext);
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [filter, setFilter] = useState('today');
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState([
    { startDate: new Date(), endDate: new Date(), key: 'selection' }
  ]);

  const applyFilter = (data, selectedFilter) => {
    const now = new Date();
    let filtered = [];

    if (selectedFilter === 'today') {
      filtered = data.filter(act => new Date(act.timestamp).toDateString() === now.toDateString());
    } else if (selectedFilter === 'week') {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      filtered = data.filter(act => new Date(act.timestamp) >= startOfWeek);
    } else if (selectedFilter === 'month') {
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      filtered = data.filter((act) => {
        const date = new Date(act.timestamp);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
      });
    }

    setFilteredActivities(filtered);
  };

  const fetchActivities = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/activity', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedActivities = res.data.map(act => ({
        ...act,
        category: classifyCategory(act.url),
      }));

      setActivities(updatedActivities);
      applyFilter(updatedActivities, filter);
    } catch (err) {
      console.error('Error fetching activities:', err);
    }
  }, [filter]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    applyFilter(activities, newFilter);
  };

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);
  useEffect(() => {
  const toggleCalendar = () => setShowCalendar(prev => !prev);

  window.addEventListener('toggleCalendar', toggleCalendar);

  return () => {
    window.removeEventListener('toggleCalendar', toggleCalendar);
  };
}, []);

  // Listen for App.js calendar/export buttons
  useEffect(() => {
    const toggleCalendar = () => setShowCalendar(prev => !prev);
    const handleExport = () => {
      const csv = [
        ['URL', 'Time Spent (s)', 'Category', 'Timestamp'],
        ...filteredActivities.map(a => [a.url, a.timeSpent, a.category, new Date(a.timestamp).toLocaleString()])
      ].map(e => e.join(',')).join('\n');

      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'activity_data.csv';
      link.click();
    };

    window.addEventListener('toggleCalendar', toggleCalendar);
    window.addEventListener('triggerExportCSV', handleExport);

    return () => {
      window.removeEventListener('toggleCalendar', toggleCalendar);
      window.removeEventListener('triggerExportCSV', handleExport);
    };
  }, [filteredActivities]);

  return (
    <div className={`dashboard-layout ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <Sidebar
        filter={filter}
        onFilterChange={handleFilterChange}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
      <div className="main-dashboard-content">
        <DashboardContent
          activities={filteredActivities}
          formatTime={(s) => {
            const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
            return `${h}h ${m}m ${sec}s`;
          }}
          showCalendar={showCalendar}
          dateRange={dateRange}
          setDateRange={setDateRange}
        />
      </div>
    </div>
  );
};

export default Dashboard;
