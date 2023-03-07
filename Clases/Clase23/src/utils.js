import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Strategy } from 'passport-jwt';

const PRIVATE_KEY = "CoderKeyMuySecret";

export const passportStrategy = (Strategy) => {
    return async(req, res, next) => {
        passport.authenticate(Strategy, function(error, user, info) {
            if (error) return next(error);
            if (!user) return res.status(401).send({error: info.message?info.message:info.toString()});
            req.user = user;
            next()
        })(req, res, next);
    }
}

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
// Irreversible

export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;