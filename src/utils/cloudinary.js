import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
  cloud_name: 'diwkr6fsb', 
  api_key: '859651897466938', 
  api_secret: '_iRDWV3ZDHRMYFuONZP_K-mPvKM' 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        console.log("file is uploaded on cloudinary",response.url)
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null;
    }
}

export{ uploadOnCloudinary}