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
  }, [selectedMonth, currentPage, searchText]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/transactions', {
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
    setSearchText(''); // Clear search text when month changes
    setCurrentPage(1); // Reset to the first page when month changes
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset to the first page when search is triggered
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="container">
      <h2>Transactions Table</h2>
      <div className="form-group">
        <label htmlFor="monthSelect">Select Month:</label>
        <select id="monthSelect" className="form-control" value={selectedMonth} onChange={handleMonthChange}>
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
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search transaction"
        />
        <button className="btn" onClick={handleSearch}>Search</button>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Price</th>
              <th scope="col">Description</th>
              <th scope="col">Category</th>
              <th scope="col">Image</th>
              <th scope="col">Sold</th>
              <th scope="col">Date of Sale</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={transaction.id}>
                <th scope="row">{index + 1}</th>
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
      </div>
      <div className="pagination">
        <button
          className="btn btn-primary"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="btn btn-primary"
          onClick={handleNextPage}  
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionsTable;
