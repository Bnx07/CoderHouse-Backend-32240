import passport from "passport";
import local from "passport-local";
import userManager from "../dao/dbManagers/users.js";
import CartManager from '../dao/dbManagers/carts.js';
import config from "./config.js";

import {createHash, isValidPassword} from "../utils/utils.js";
import { logger } from '../utils/logger.js';

import jwt from 'passport-jwt';

const um = new userManager();
const cm = new CartManager();

const jwtStrategy = jwt.Strategy;
const extractJwt = jwt.ExtractJwt;

const localStrategy = local.Strategy;

const initPassport = () => {

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async(id, done) => {
        let user = await um.getOne({_id: id})
        done(null, user);
    });

    passport.use('register', new localStrategy( // This works
        {passReqToCallback: true, usernameField: 'email'}, async(req, something, username, done) => {
            const {first_name, last_name, age, email, password} = req.body;
            try {
                let user = await um.getOne({email: email});
                req.logger.debug(user);
                if (user != null) {
                    req.logger.debug("El usuario ya existe");
                    return done(null, false, {status: "Error", message: "El usuario ya existe"});
                }

                let cartObj = await cm.post(); // Puede que rompa por no tener params

                let cart = cartObj._id

                const result = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password),
                    cart
                }

                let newUser = await um.post(result);

                return done(null, newUser);
            } catch(error) {
                done(error)
            }
        }
    ))

    passport.use('login', new localStrategy( // No redirige si está mal
        {passReqToCallback: true, usernameField: 'email'}, async(req, something, abc, done) => {
            const {email, password} = req.body;
            try {
                const user = await um.getOne({email});
                if (!user) {
                    logger.info("El usuario no existe");
                    return done(null, false, {status: "Error", message: "El usuario no existe"});
                }

                if (!isValidPassword(user, password)) return done(null, false, {status: "Error", message: "La contraseña no es válida"});

                return done(null, user);
            } catch(error) {
                return done("Oops" + error);
            }
        }
    ))

    passport.use('logout', new localStrategy( // Usar JWT
        {passReqToCallback: true, usernameField: 'email'}, async() => {
        
        }
    ))

    passport.use('jwt', new jwtStrategy({
        jwtFromRequest:extractJwt.fromExtractors([cookieExtractor]), // Recibe la cookie y extrae el token
        secretOrKey: config.jwtKey
    }, async(jwt_payload, done) => {
        try {
            if (!jwt_payload) {
                return done();
            } else {
                return done(null, jwt_payload);
            }
        } catch (error) {
            return done(error);
        }
    }
    ));
}

export const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['coderCookieToken'];
    }
    return token
}

export default initPassport;