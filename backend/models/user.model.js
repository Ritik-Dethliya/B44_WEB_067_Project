import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true,unique:true},
    donations:[{type:mongoose.Schema.Types.ObjectId,ref:"donation"}],
    role: {
        type: String,
        enum: ['donor', 'admin', 'staff'],
        default: 'donor'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    profileImage: {
        type: String, 
        default: ''
    }
})

export default mongoose.model('user',userSchema)