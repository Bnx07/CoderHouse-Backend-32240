import dotenv from 'dotenv';

dotenv.config();

export default {
    connection: process.env.CONNECTION,
    bcryptGenSalt: process.env.BCRYPTGENSALT,
    jwtKey: process.env.JWTKEY
}