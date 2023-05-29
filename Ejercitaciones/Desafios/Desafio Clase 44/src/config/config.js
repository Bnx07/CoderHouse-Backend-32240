import dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT,
    connection: process.env.CONNECTION,
    bcryptGenSalt: process.env.BCRYPTGENSALT,
    jwtKey: process.env.JWTKEY,
    persistence: process.env.PERSISTENCE,
    mailPassword: process.env.MAILPASSWORD,
    logger: process.env.LOGGER
}