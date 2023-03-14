import dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT,
    mongoURL: process.env.MONGOURL,
    language: process.env.LENGUAJE
}