import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('March');
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchTransactions();
  }, [selectedMonth, currentPage]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('/transactions', {
        params: {
          month: selectedMonth,
          search: searchText,
          page: currentPage,
        },
      });
      const { records, totalPages } = response.data;
      setTransactions(records);
      setTotalPages(totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div>
      <h2>Transactions Table</h2>
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
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search transaction"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Image</th>
            <th>Sold</th>
            <th>Date of Sale</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.title}</td>
              <td>{transaction.price}</td>
              <td>{transaction.description}</td>
              <td>{transaction.category}</td>
              <td>
                <img src={transaction.image} alt={transaction.title} style={{ width: '100px' }} />
              </td>
              <td>{transaction.sold ? 'Sold' : 'Not Sold'}</td>
              <td>{transaction.dateOfSale}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionsTable;
