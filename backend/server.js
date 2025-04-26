import express from 'express'
import connectDB from './config.db.js'
import userRouter from './routers/user.router.js'
import cors from 'cors'
import donationRouter from './routers/donation.router.js'
import communityRouter from './routers/community.router.js'
import profilUpload from './routers/profileImage.router.js'

connectDB()
const app=express()
app.use(express.json())
app.use(cors())
app.use('/user',userRouter)

app.use('/profile',profilUpload)
app.use('/donation',donationRouter)
app.use('/community',communityRouter)
app.use((req,res)=>{
    res.status(404).send({"msg":"bad request k"})
})
app.listen(8000,()=>{
    console.log("server Run on 8000")
})