import React from 'react';
import TransactionsTable from './components/TransactionTable';
import TransactionStatistics from './components/Transactionstatistics';
import TransactionsBarChart from './components/TransactionBarChart';


const App = () => {
  return (
    <div>
      <TransactionsTable />
      <TransactionStatistics />
      <TransactionsBarChart />
    </div>
  );
};

export default App;