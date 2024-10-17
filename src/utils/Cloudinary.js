import {v2 as cloudinary } from "cloudinary"
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async ( localFilePath ) => {

    try {
        if (!localFilePath) {
            return null
        }

     const cloudResponse = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        //file is uploaded successfully
        console.log("file is uploaded successfully",cloudResponse.url);


        return cloudResponse //user ko bheij rhe
         
        
    } catch (error) {
        fs.unlinkSync(localFilePath) //remove the locally saved temporary file as the upload operation got failed
        return null
    }

}

export {uploadOnCloudinary}
