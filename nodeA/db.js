const  mongoose = require ("mongoose")

const dotenv = require("dotenv")

dotenv.config()

const URL = `${process.env.MONGODB_URL}` 

  const connectDB = async () =>{
    await mongoose.connect(URL, (err)=>{
        if(err) throw err
        console.log("Mongodb connected...")
    }) 
    }    
   
module.exports = connectDB   
        