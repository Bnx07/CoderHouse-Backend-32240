import {fileURLToPath} from 'url';
import { dirname } from 'path';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, __dirname+'../files/img');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
})

const uploader = multer({storage});

export {__dirname, uploader};