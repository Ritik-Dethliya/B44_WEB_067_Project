import mongoose from "mongoose";

function connectDB(){
    mongoose.connect('mongodb://127.0.0.1:27017/Cw').then(()=>{
        console.log("Connect to Db Successful !")
    }).catch((err)=>{
        console.log("error in connection",err)
    })
}
export default connectDB
