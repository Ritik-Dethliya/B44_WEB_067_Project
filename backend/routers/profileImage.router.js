import multer from "multer";
import cloudinary from "../cloudinary.config.js";
import e from "express";
import userModel from "../models/user.model.js";
import authentication from "../middlewares/authmiddleware.js";
import streamifier from 'streamifier'

const profilUpload=e.Router()

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

profilUpload.use(authentication)
profilUpload.post('/upload/:userId', upload.single('image'), async (req, res) => {
    try {
      // Upload to Cloudinary using user._id as public_id
      const result = await cloudinary.uploader.upload_stream(
        {
          public_id: `users/${req.userid}`,
          folder: 'user_profiles',
          overwrite: true,
          resource_type: 'image',
        },
        async (error, result) => {
          if (error) return res.status(500).json({ error });
  
          // Optionally save the URL to the use
          let user=await userModel.findById(req.userid)
          user.profileImage = result.secure_url;
          await user.save();
  
          res.status(200).json({
            message: 'Image uploaded successfully',
            url: result.secure_url,
          });
        }
      );
      if (req.file) {
        
        
        streamifier.createReadStream(req.file.buffer).pipe(result);
      } else {
        res.status(400).send('No file uploaded');
      }
    }
    catch(error){
        console.log(error)
    }
}
    )

export default profilUpload