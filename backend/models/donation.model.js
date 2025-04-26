import mongoose from "mongoose";

const donationSchema=mongoose.Schema({
    donar:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user', 
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 100
    },
    message: {
        type: String,
        maxlength: 500
    },
    paymentMethod: {
        type: String,
        enum: ['card', 'paypal', 'upi', 'bank_transfer', 'other'],
        required: true
    },
    transactionId: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending'
    },
    campaign: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaign' // if you're supporting campaigns
    }
})

export default mongoose.model("donation",donationSchema)