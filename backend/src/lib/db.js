const mongoose=require("mongoose");

const connectDB=async()=>{
    try{
       const conn= await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Mongodb is connected ${conn.connection.host}`);

    }catch(error)
    {
      console.log("Mongodb is not connected :",error);
    }
};

module.exports={
    connectDB,
}