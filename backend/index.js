// app.js
const express = require('express')
const mongoose=require('mongoose')

const app = express()
const port=3000
const months = ["January", "February","March","April","May","June","July","August","September","October","November","December"];
app.use(express.json())


//fetching all data 
app.get('/product',async(req,res)=>{
  const fetched_data = await mongoose.connection.db.collection("sample")
  fetched_data.find({}).toArray( function(err,data){
      res.status(200).json(data);
      if(err) console.log(err);
      else console.log(data) 
  })
})

//As per page And search 
app.get('/transactions', async (req, res) => {
  const search = req.query.search || '';
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;

  const collection = mongoose.connection.db.collection("sample");
  const totalRecords = await collection.countDocuments({});

  let query = {};
  if (search !== '') {
    query = {
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { price: { $regex: search, $options: 'i' } }
      ]
    };
  }

  const filteredRecords = await collection.find(query).toArray();
  const totalPages = Math.ceil(filteredRecords.length / perPage);

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedRecords = filteredRecords.slice(startIndex, endIndex);

  const response = {
    page,
    perPage,
    totalPages,
    totalRecords,
    records: paginatedRecords
  };

  res.status(200).json(response);
});



// app.get('/product/statistics',async(req,res)=>{
//   const selectedMonth = req.query.month;
//   const index = months.indexOf(selectedMonth);
//   console.log(index);
  

// const selectedDate = '2022-06-27T20:29:54+05:30';
// const month = DateObj.getMonth();
// console.log(month);


// const fetched_data = await mongoose.connection.db.collection("sample")
//   fetched_data.find({}).toArray( function(err,data){
//       res.status(200).json(data);
//       const sortedData = data.sort((a, b) => {
//         const monthA = parseInt(a.dateOfSale.substring(5, 7));
//         const monthB = parseInt(b.dateOfSale.substring(5, 7));
      
//         return monthA - monthB;
//       });
//   })

 
// })



// API FOR STATISTICS
app.get('/statistics', async (req, res) => {
  const selectedMonth = req.query.month;

  const fetched_data = await mongoose.connection.db.collection("sample");
  fetched_data.find({}).toArray(async function (err, data) {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const filteredData = data.filter(item => {
        const month = new Date(item.dateOfSale).toLocaleString('default', { month: 'long' });
        return month.toLowerCase() === selectedMonth.toLowerCase();
      });

      const  TotalSale= filteredData.reduce((sum, item) => sum + item.price, 0);
      const TotalSoldItem = filteredData.filter(item => item.sold).length;
      const TotalNotSoldItem = filteredData.filter(item => !item.sold).length;

      res.status(200).json({
        TotalSale,
        TotalSoldItem,
        TotalNotSoldItem
      });
    }
  });
});












mongoose.set("strictQuery",false)
mongoose.connect('mongodb://admin:admin@ac-eypf8xx-shard-00-00.zr1zvao.mongodb.net:27017,ac-eypf8xx-shard-00-01.zr1zvao.mongodb.net:27017,ac-eypf8xx-shard-00-02.zr1zvao.mongodb.net:27017/eccomerce?ssl=true&replicaSet=atlas-1jpzcv-shard-0&authSource=admin&retryWrites=true&w=majority')
.then(()=>{
  console.log('connected to mongo db')
  app.listen(port, () => {
    console.log(`app listening on port ${port}`)
  })
  
}).catch((error)=>{
  console.log(error)
})























