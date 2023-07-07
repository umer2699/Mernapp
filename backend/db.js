const mongoose=require('mongoose');
const mongoUri='mongodb://admin:admin@ac-eypf8xx-shard-00-00.zr1zvao.mongodb.net:27017,ac-eypf8xx-shard-00-01.zr1zvao.mongodb.net:27017,ac-eypf8xx-shard-00-02.zr1zvao.mongodb.net:27017/eccomerce?ssl=true&replicaSet=atlas-1jpzcv-shard-0&authSource=admin&retryWrites=true&w=majority'


const mongodb=async() =>{
 await mongoose.connect(mongoUri,{useNewUrlParser: true},async(err,result)=>{
    if(err) console.log("--",err)
    else{
    console.log("connected");

//read all data done 
    const fetched_data = await mongoose.connection.db.collection("sample")
    fetched_data.find({dateOfSale:'2022-02-27T20:29:54+05:30'}).toArray( function(err,data){
        if(err) console.log(err);
        else console.log(data)
    })


    }
});
}


module.exports=mongodb;