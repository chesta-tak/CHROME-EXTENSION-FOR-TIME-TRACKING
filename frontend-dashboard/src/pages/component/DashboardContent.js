// export default DashboardContent;
import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { FaClock, FaGlobe, FaFireAlt, FaFolderOpen } from 'react-icons/fa';
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import { enUS } from 'date-fns/locale';

const DashboardContent = ({ activities, formatTime }) => {
  const [selectedActivity, setSelectedActivity] = useState(null);
  
    const [dateRange, setDateRange] = useState([
    {
      startDate: addDays(new Date(), -7),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  

  const filteredActivities = activities.filter(a => {
    const date = new Date(a.timestamp);
    return date >= dateRange[0].startDate && date <= dateRange[0].endDate;
  //setShowCalendar(false);
});

  const totalTime = filteredActivities.reduce((sum, act) => sum + act.timeSpent, 0);
  const uniqueWebsites = new Set(filteredActivities.map(a => a.url)).size;
  const categoryCount = new Set(filteredActivities.map(a => a.category)).size;

  const mostVisited = filteredActivities.reduce((acc, curr) => {
    acc[curr.url] = (acc[curr.url] || 0) + 1;
    return acc;
  }, {});
  const rawTopUrl = Object.entries(mostVisited).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
const topUrl = rawTopUrl.replace(/^https?:\/\//, '').split(/[/?#]/)[0];
  const websiteData = Object.values(
    filteredActivities.reduce((acc, curr) => {
      if (!acc[curr.url]) acc[curr.url] = { name: curr.url, time: 0 };
      acc[curr.url].time += curr.timeSpent;
      return acc;
    }, {})
  ).sort((a, b) => b.time - a.time).slice(0, 5);

  const categoryData = Object.values(
    filteredActivities.reduce((acc, curr) => {
      const cat = curr.category || 'Uncategorized';
      if (!acc[cat]) acc[cat] = { name: cat, time: 0 };
      acc[cat].time += curr.timeSpent;
      return acc;
    }, {})
  );

  

  const openModal = (activity) => setSelectedActivity(activity);
  const closeModal = () => setSelectedActivity(null);

  return (
    
      <div className="dashboard-content">
      {/* Top Toolbar */}
      

      {/* Summary Cards */}
      <div className="summary-cards-grid">
        <div className="card-box"><FaClock /><div>{formatTime(totalTime)}</div><div>Total Time</div></div>
        <div className="card-box"><FaGlobe /><div>{uniqueWebsites}</div><div>Websites Visited</div></div>
        <div className="card-box"><FaFireAlt /><div>{topUrl}</div><div>Most Visited</div></div>
        <div className="card-box"><FaFolderOpen /><div>{categoryCount}</div><div>Categories</div></div>
      </div>

      {/* Charts */}
      <div className="charts-wrapper">
      
        <div className="chart-card">
          <h5>📊 Top Websites (Column)</h5>
          <Plot
            data={[{
              type: 'bar',
              x: websiteData.map(d => d.name),
              y: websiteData.map(d => d.time),
              marker: { color: '#36A2EB' },
            }]}
              
     />
        </div>

        <div className="chart-card">
          <h5>📈 Time by Category</h5>
          <Plot
            data={[{
              x: categoryData.map(d => d.name),
              y: categoryData.map(d => d.time),
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: 'orange' },
            }]}
            />
        </div>
       
       
       <div className="chart-card calendar-card">
    <h5>📅 Select Date Range</h5>
    <DateRange
      editableDateInputs={true}
      onChange={item => setDateRange([item.selection])}
      moveRangeOnFirstSelection={false}
      ranges={dateRange}
      locale={enUS}
    />
  </div>
        
  </div>

      {/* Activity Feed */}
      <h4 className="activity-heading">🕒 Recent Activity</h4>
      <div className="activity-grid mt-4">
        
        {filteredActivities.length === 0 ? <p>No activity in this range.</p> : (
          filteredActivities.slice(0, 6).map((a, i) => (
            <div className="activity-box" key={i} onClick={() => openModal(a)}>
              <h6>{new URL(a.url).hostname}</h6>
              <p>⏱ {formatTime(a.timeSpent)}</p>
              <p>📂 {a.category}</p>
              <small>🗓 {new Date(a.timestamp).toLocaleString()}</small>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {selectedActivity && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="activity-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>×</button>
            <h3>📄 Activity Details</h3>
            <p><strong>URL:</strong> {selectedActivity.url}</p>
            <p><strong>Time Spent:</strong> {formatTime(selectedActivity.timeSpent)}</p>
            <p><strong>Category:</strong> {selectedActivity.category}</p>
            <p><strong>Timestamp:</strong> {new Date(selectedActivity.timestamp).toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardContent;
