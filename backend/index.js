// app.js
const express = require('express')
const mongoose=require('mongoose')

const app = express()
const port=3000

app.use(express.json())



//fetching all data 
app.get('/product',async(req,res)=>{
  const fetched_data = await mongoose.connection.db.collection("sample")
  fetched_data.find({}).toArray( function(err,data){
      if(err) console.log(err);
      else console.log(data)
     
  })
})










mongoose.set("strictQuery",false)
mongoose.connect('mongodb://admin:admin@ac-eypf8xx-shard-00-00.zr1zvao.mongodb.net:27017,ac-eypf8xx-shard-00-01.zr1zvao.mongodb.net:27017,ac-eypf8xx-shard-00-02.zr1zvao.mongodb.net:27017/eccomerce?ssl=true&replicaSet=atlas-1jpzcv-shard-0&authSource=admin&retryWrites=true&w=majority')
.then(()=>{
  console.log('connected to mongo db')
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  
}).catch((error)=>{
  console.log(error)
})























