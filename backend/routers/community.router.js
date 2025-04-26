import e from "express";
import communityModel from "../models/community.model.js";
import authentication from "../middlewares/authmiddleware.js";
import multer from "multer";
import cloudinary from "../cloudinary.config.js";
import streamifier from 'streamifier'
import dotenv from 'dotenv'
import userModel from "../models/user.model.js";
import { communityCreateMail } from "../middlewares/emailSender.js";

dotenv.config()
const communityRouter=e.Router()

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

function uploadToCloudinary(buffer, public_id) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        public_id,
        folder: 'user_profiles',
        overwrite: true,
        resource_type: 'image',
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
}



communityRouter.get("/get-community/",async(req,res)=>{
    try {
        let Communities=await communityModel.find()
        res.status(200).send({Communities})
    } catch (error) {
        console.log(error)
        res.status(500).send({"msg":"Something went wrong in geting community"})
    }
})

communityRouter.get("/get-community/:id",async(req,res)=>{
    try {
        let {id}=req.params
        let Community=await communityModel.findById(id).populate('donors',"name email isVerified profileImage -_id")
        res.status(200).send({Community})
    } catch (error) {
        console.log(error)
        res.status(500).send({"msg":"Something went wrong in geting community"})
    }
})

communityRouter.get("/get-community/category/:category",async(req,res)=>{
  try {
      let {category}=req.params
      let Communities=await communityModel.find({category})
      res.status(200).send({Communities})
  } catch (error) {
      console.log(error)
      res.status(500).send({"msg":"Something went wrong in geting community"})
  }
})

communityRouter.use(authentication)

communityRouter.post("/create-community",upload.single('image'),async(req,res)=>{
  try{
    if (!req.file) return res.status(400).send({ msg: 'No file uploaded' });
    const public_id = `users/${req.userid}${Math.random()}`;
    const result = await uploadToCloudinary(req.file.buffer, public_id)
    req.body.createdBy = req.userid;

    const userscommunities = await communityModel.find({ createdBy: req.userid });
    if (userscommunities && userscommunities.length > 1) {
      return res.status(404).send({ msg: "User already has two communities" });
    }

    req.body.imageUrl = result.secure_url;
    const user=await userModel.findById(req.userid)
    let email=user.email
    const newCommunity = await communityModel.create(req.body);

    communityCreateMail(email,user.name,newCommunity.category)
    return res.status(201).send({ newCommunity, msg: "Community created successfully" });

  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: "Something went wrong" });
  }
})

export default communityRouter