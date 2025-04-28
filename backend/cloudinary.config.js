import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv'
dotenv.config()

    // Configuration
    cloudinary.config({ 
        cloud_name: 'djapskmhv', 
        api_key: process.env.Cloude_Api, 
        api_secret: process.env.Cloude_API_secret
    });
    
export default cloudinary