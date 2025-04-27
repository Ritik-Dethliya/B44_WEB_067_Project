import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config   
function connectDB(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Connect to Db Successful !")
    }).catch((err)=>{
        console.log("error in connection",err)
    })
}
export default connectDB
