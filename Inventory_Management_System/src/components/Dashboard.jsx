import React, { useState, useEffect } from 'react';
import { getInventoryReport } from '../services/api';
import useInventory from '../hooks/UseInventory';
import '../css/Dashboard.css';

const Dashboard = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setAlert } = useInventory();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const data = await getInventoryReport();
        setReport(data);
        setLoading(false);
      } catch (err) {
        setAlert(err.message, 'danger');
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;
  if (!report) return <div>No data available</div>;

  return (
    <div className="dash-dashboard">
      <h2 className="dash-title">Inventory Dashboard</h2>

      <div className="dash-row">
        <div className="dash-card">
          <div className="dash-card-body">
            <h5 className="dash-card-title">Total Products</h5>
            <p className="dash-display">{report.totalProducts}</p>
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-card-body">
            <h5 className="dash-card-title">Low Stock Items</h5>
            <p className="dash-display dash-text-danger">{report.lowStockItems}</p>
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-card-body">
            <h5 className="dash-card-title">Total Categories</h5>
            <p className="dash-display">{report.totalCategories}</p>
          </div>
        </div>
      </div>

      <div className="dash-activities">
        <h5 className="dash-activities-title">Recent Activities</h5>
        <ul className="list-group">
          {Array.isArray(report.recentActivities) && report.recentActivities.length > 0 ? (
            report.recentActivities.map((activity, index) => (
              <li key={index} className="dash-activity-item">
                <span>{activity.description}</span>
                <span className="dash-muted">{activity.timestamp}</span>
              </li>
            ))
          ) : (
            <li className="dash-activity-item dash-muted">No recent activities</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;