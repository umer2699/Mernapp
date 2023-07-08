import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const TransactionsBarChart = () => {
  const [selectedMonth, setSelectedMonth] = useState('March');
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    fetchBarChartData();
  }, [selectedMonth]);

  const fetchBarChartData = async () => {
    try {
      const response = await axios.get('/bar-chart', {
        params: {
          month: selectedMonth,
        },
      });
      setBarChartData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <div>
      <h2>Transactions Bar Chart</h2>
      <div>
        <label htmlFor="monthSelect">Select Month:</label>
        <select id="monthSelect" value={selectedMonth} onChange={handleMonthChange}>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>
      <div>
        {barChartData.map((data) => (
          <div className="chart-item" key={data.range}>
            <span>{data.range}</span>
            <div className="bar" style={{ width: `${data.count * 10}px` }}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionsBarChart;
