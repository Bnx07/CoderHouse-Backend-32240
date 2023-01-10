import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

export default __dirname; // Aca declaro el dirname como vi y en app.js tengo lo otro

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(nuller,__dirname+'/public/images');
    },
    filename: function(req, file, cb) {
        console.log(file);
        cb(null, file.originalname);
    }
})

export const uploader = multer({storage});