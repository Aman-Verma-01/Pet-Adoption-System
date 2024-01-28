import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

 const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload file on Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // File has been uploaded Successfully
    // console.log("File Uploaded on Cloudinary" + response.url);
    fs.unlinkSync(localFilePath);

    return response.url;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    // Removes loacl saved temporary file as the upload operation gets failed

    return null;
  }
};


export {uploadOnCloudinary}