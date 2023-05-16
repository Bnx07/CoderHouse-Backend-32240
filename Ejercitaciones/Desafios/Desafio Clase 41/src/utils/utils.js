import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import nodemailer  from 'nodemailer';

import config from '../config/config.js';

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(parseInt(config.bcryptGenSalt)));
// Irreversible

export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

export const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'benjabastan@gmail.com',
        pass: config.mailPassword
    }
})

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

export default __dirname;