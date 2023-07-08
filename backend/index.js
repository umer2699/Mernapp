const express = require('express')
const mongoose=require('mongoose')
const axios = require('axios');
const cors = require('cors');
const app = express()
const port=5000
const months = ["January", "February","March","April","May","June","July","August","September","October","November","December"];
app.use(express.json())


const allowedOrigins = ['http://localhost:3000'];

// Configure CORS options
const corsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200,
};

// Enable CORS for all routes
app.use(cors(corsOptions));











//fetching all data 
app.get('/product',async(req,res)=>{
  const fetched_data = await mongoose.connection.db.collection("sample")
  fetched_data.find({}).toArray( function(err,data){
      res.status(200).json(data);
      if(err) console.log(err);
      else console.log(data) 
  })
})

//ApI for transactions As per page And search 
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
//   const prefferedMonth = req.query.month;
//   const index = months.indexOf(prefferedMonth);
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
  const prefferedMonth = req.query.month;

  const fetched_data = await mongoose.connection.db.collection("sample");
  fetched_data.find({}).toArray(async function (err, data) {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const filteredData = data.filter(item => {
        const month = new Date(item.dateOfSale).toLocaleString('default', { month: 'long' });
        return month.toLowerCase() === prefferedMonth.toLowerCase();
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


//API for bar-chart
app.get('/bar-chart', async (req, res) => {
  const prefferedMonth = req.query.month;

  const collection = mongoose.connection.db.collection("sample");
  const query = {
    dateOfSale: {
      $regex: `\\d{4}-${prefferedMonth.padStart(2, '0')}-\\d{2}`,
      $options: 'i'
    }
  };

  const filteredData = await collection.find(query).toArray();

  const priceRanges = [
    { range: '0 - 100', count: 0 },
    { range: '101 - 200', count: 0 },
    { range: '201 - 300', count: 0 },
    { range: '301 - 400', count: 0 },
    { range: '401 - 500', count: 0 },
    { range: '501 - 600', count: 0 },
    { range: '601 - 700', count: 0 },
    { range: '701 - 800', count: 0 },
    { range: '801 - 900', count: 0 },
    { range: '901 - above', count: 0 }
  ];

  filteredData.forEach(item => {
    const price = item.price;
    if (price >= 0 && price <= 100) {
      priceRanges[0].count++;
    } else if (price >= 101 && price <= 200) {
      priceRanges[1].count++;
    } else if (price >= 201 && price <= 300) {
      priceRanges[2].count++;
    } else if (price >= 301 && price <= 400) {
      priceRanges[3].count++;
    } else if (price >= 401 && price <= 500) {
      priceRanges[4].count++;
    } else if (price >= 501 && price <= 600) {
      priceRanges[5].count++;
    } else if (price >= 601 && price <= 700) {
      priceRanges[6].count++;
    } else if (price >= 701 && price <= 800) {
      priceRanges[7].count++;
    } else if (price >= 801 && price <= 900) {
      priceRanges[8].count++;
    } else {
      priceRanges[9].count++;
    }
  });

  res.status(200).json(priceRanges);
});



//APi for pie-chart
app.get('/pie-chart', async (req, res) => {
  const prefferedMonth = req.query.month;

  const collection = mongoose.connection.db.collection("sample");
  const query = {
    dateOfSale: {
      $regex: `\\d{4}-${prefferedMonth.padStart(2, '0')}-\\d{2}`,
      $options: 'i'
    }
  };

  const filteredData = await collection.find(query).toArray();

  const categoryCounts = {};

  filteredData.forEach(item => {
    const category = item.category;
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
  });

  const pieChartData = Object.entries(categoryCounts).map(([category, count]) => {
    return { category, count };
  });

  res.status(200).json(pieChartData);
});



//API ALL 3COMBINED 
app.get('/combined-data', async (req, res) => {
  try {
    const prefferedMonth = req.query.month;
    const barChartURL = `http://localhost:3000/bar-chart?month=${prefferedMonth}`;
    const pieChartURL = `http://localhost:3000/pie-chart?month=${prefferedMonth}`;
    const transactionURL = 'http://localhost:3000/transactions';

    const [barChartData, pieChartData, transactionData] = await Promise.all([
      axios.get(barChartURL),
      axios.get(pieChartURL),
      axios.get(transactionURL)
    ]);

    const combinedData = {
      barChart: barChartData.data,
      pieChart: pieChartData.data,
      transactions: transactionData.data
    };

    res.status(200).json(combinedData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch combined data' });
  }
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























