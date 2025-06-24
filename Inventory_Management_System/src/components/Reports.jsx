import React, { useState, useEffect } from 'react';
import { getSalesReport } from '../services/api';
import useInventory from '../hooks/UseInventory';
import '../css/Dashboard.css';

const Reports = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('monthly');
  const { setAlert } = useInventory();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await getSalesReport(timeRange);
        setReport(response.data);
        setLoading(false);
      } catch (err) {
        setAlert(err.message, 'danger');
        setLoading(false);
      }
    };

    fetchReport();
  }, [timeRange]);

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  if (loading) return <div>Loading report...</div>;
  if (!report) return <div>No data available</div>;

  return (
    <div className="report-reports">
      <div className="report-header">
        <h2 className="report-title">Sales Reports</h2>
        <div className="report-btn-group">
          <button
            className={`report-btn ${timeRange === 'daily' ? 'active' : ''}`}
            onClick={() => handleTimeRangeChange('daily')}
          >
            Daily
          </button>
          <button
            className={`report-btn ${timeRange === 'weekly' ? 'active' : ''}`}
            onClick={() => handleTimeRangeChange('weekly')}
          >
            Weekly
          </button>
          <button
            className={`report-btn ${timeRange === 'monthly' ? 'active' : ''}`}
            onClick={() => handleTimeRangeChange('monthly')}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="report-card">
        <h5 className="report-card-title">Sales Summary</h5>
        <div className="report-summary-row">
          <div className="report-summary-item">
            Total Sales: <strong>${report.totalSales.toFixed(2)}</strong>
          </div>
          <div className="report-summary-item">
            Total Orders: <strong>{report.totalOrders}</strong>
          </div>
          <div className="report-summary-item">
            Average Order Value: <strong>${report.averageOrderValue.toFixed(2)}</strong>
          </div>
        </div>
      </div>

      <div className="report-card">
        <h5 className="report-card-title">Top Selling Products</h5>
        <div className="report-table-responsive">
          <table className="report-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity Sold</th>
                <th>Total Revenue</th>
              </tr>
            </thead>
            <tbody>
              {report.topSellingProducts.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.quantitySold}</td>
                  <td>${product.totalRevenue.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
