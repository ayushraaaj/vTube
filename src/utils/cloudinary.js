import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (filePath) => {
    let absolutePath;
    try {
        if (!filePath) {
            console.log(`File path missing: ${filePath}`);
            return null;
        }

        const options = {
            resource_type: "auto",
        };

        const response = await cloudinary.uploader.upload(filePath, options);

        console.log(response.url);

        // Once the file is uploaded, we would like to delete it from our server
        absolutePath = path.resolve(filePath);

        if (fs.existsSync(absolutePath)) {
            fs.unlinkSync(absolutePath);
        }

        return response;
    } catch (error) {
        if (fs.existsSync(absolutePath)) {
            fs.unlinkSync(absolutePath);
        }
        return null;
    }
};

export const deleteFromCloudinary = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId);
        console.log(`Image is deleted with Public Id: ${publicId}`);
    } catch (error) {
        console.log("Error deleting from cloudinary");
        return null;
    }
};
