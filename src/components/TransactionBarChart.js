import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, XAxis, YAxis, Tooltip, Bar } from 'recharts';
import '../App.css';
import { Button } from 'bootstrap';

const TransactionsBarChart = () => {
  const [selectedMonth, setSelectedMonth] = useState('March');
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    fetchBarChartData();
  }, [selectedMonth]);

  const fetchBarChartData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/bar-chart', {
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
    <div className='bar'>
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
        <BarChart width={730} height={250} data={barChartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="url(#colorGradient)" />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8884d8" />
              <stop offset="50%" stopColor="#82ca9d" />
              <stop offset="100%" stopColor="#8884d8" />
            </linearGradient>
          </defs>
        </BarChart>
      </div>
    </div>
  );
};

export default TransactionsBarChart;
