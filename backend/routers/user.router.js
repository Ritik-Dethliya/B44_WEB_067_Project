import userModel from "../models/user.model.js";
import e from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import authentication from "../middlewares/authmiddleware.js";
const userRouter=e.Router();
const saltRounds=10
userRouter.use('/signup',async(req,res)=>{
    try {
        let {password}=req.body
        if(!password)return res.status(400).send({"msg":"Password is not found"})
        bcrypt.hash(password, saltRounds, async function(err, hash) {
            if(err){
                console.log("error in hashing")
                res.status(500).send({"msg":"error in password encrition"})
            }else{
                req.body.password=hash
                let newuser= await userModel.create(req.body)
                res.status(201).send({"msg":"user created Successful",newuser})
            }
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({"msg":"Something went wrong"})
    }
})

userRouter.use("/login",async(req,res)=>{
    let {email,password}=req.body
    try {
        let user =await userModel.findOne({email},{__v:0,})
        let isMatch=await bcrypt.compare(password,user.password)
        if(isMatch){
            let token =jwt.sign({userid:user._id},"ritik")
            user.password=""
            user._id=""
            res.send({"msg":"user login successful",token,user})
        }
        else{
            res.status(400).send({"msg":"password incorrect"})
        }
    } catch (error) {
        console.log(error)
        res.send(500).send({"msg":"Something went wrong"})
    }
})

userRouter.get("/get-userProfile/",authentication,async(req,res)=>{
    try {
        console.log(req.userid)
        let userProfile=await userModel.findById(req.userid)
        res.status(200).send({userProfile})
    } catch (error) {
        console.log(error)
        res.status(500).send({"msg":"something went wrong"})
    }
})
export default userRouter