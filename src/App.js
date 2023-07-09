import React from 'react';
import TransactionsTable from './components/TransactionTable';
import TransactionStatistics from './components/Transactionstatistics';
import TransactionsBarChart from './components/TransactionBarChart';
import Navbar from './components/Navbar';


const App = () => {
  return (
    <div className='main'>
      <Navbar/>
      <TransactionsTable />
      <TransactionStatistics />
      <TransactionsBarChart />
    </div>
  );
};

export default App;