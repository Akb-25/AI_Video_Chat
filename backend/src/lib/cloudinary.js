import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config({path: "../.env"});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_ACCOUNT,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
})
console.log("Cloudinary config: ", {
    cloud_name: process.env.CLOUDINARY_ACCOUNT,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
})
export default cloudinary;