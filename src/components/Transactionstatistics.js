import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const TransactionStatistics = () => {
  const [selectedMonth, setSelectedMonth] = useState('March');
  const [totalSale, setTotalSale] = useState(0);
  const [totalSoldItems, setTotalSoldItems] = useState(0);
  const [totalNotSoldItems, setTotalNotSoldItems] = useState(0);

  useEffect(() => {
    fetchStatistics();
  }, [selectedMonth]);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get('/statistics', {
        params: {
          month: selectedMonth,
        },
      });
      const { TotalSale, TotalSoldItem, TotalNotSoldItem } = response.data;
      setTotalSale(TotalSale);
      setTotalSoldItems(TotalSoldItem);
      setTotalNotSoldItems(TotalNotSoldItem);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <div>
      <h2>Transactions Statistics</h2>
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
        <p>Total Sale: {totalSale}</p>
        <p>Total Sold Items: {totalSoldItems}</p>
        <p>Total Not Sold Items: {totalNotSoldItems}</p>
      </div>
    </div>
  );
};

export default TransactionStatistics;
