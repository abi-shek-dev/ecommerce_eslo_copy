import multer from "multer";
import fs from 'fs';
import path from 'path';

const uploadDir = 'uploads';

// Ensure the directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, callback){
        callback(null, uploadDir);
    },
    filename: function (req, file, callback){
        callback(null, Date.now() + '-' + file.originalname);
    }
})

const upload = multer({ storage });

export default upload;
