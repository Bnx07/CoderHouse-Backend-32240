import passport from "passport";
import local from "passport-local";
import userModel from "../dao/models/user.js";
import {createHash, isValidPassword} from "../utils.js";

import passport from "passport";
import jwt from 'passport-jwt';

const jwtStrategy = jwt.Strategy;
const extractJwt = jwt.ExtractJwt;

const localStrategy = local.Strategy;
const initPassport = () => {

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async(id, done) => {
        let user = await userModel.findById(id)
        done(null, user);
    });

    passport.use('register', new localStrategy( // En principio actualizado
        {passReqToCallback: true, usernameField: 'email'}, async(req, something, username, done) => {
            const {first_name, last_name, age, email, password} = req.body;
            try {
                let user = await userModel.findOne({email: email});
                if (user != null) {
                    console.log("El usuario ya existe");
                    return done(null, false, {status: "Error", message: "El usuario ya existe"});
                }

                let cartObj = await cm.createCart(); // Puede que rompa por no tener params

                let cart = cartObj._id

                const result = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password),
                    cart
                }

                let newUser = await userModel.create(result);

                return done(null, newUser);
            } catch(error) {
                done(error)
            }
        }
    ))

    passport.use('login', new localStrategy( // Usar JWT
        {passReqToCallback: true, usernameField: 'email'}, async(req, something, password, done) => {
            const {email} = req.body;
            try {
                const user = await userModel.findOne({email});
                if (!user) {
                    console.log("El usuario no existe");
                    return done(null, false);
                }

                if (!isValidPassword(user, password)) return done(null, false, {status: "Error", message: "La contraseña no es válida"});

                return done(null, user);
            } catch(error) {
                return done("Oops" + error)
            }
        }
    ))

    passport.use('logout', new localStrategy( // Usar JWT
        {passReqToCallback: true, usernameField: 'email'}, async() => {
        
        }
    ))

    passport.use('jwt', new jwtStrategy({
        jwtFromRequest:extractJwt.fromExtractors([cookieExtractor]), // Recibe la cookie y extrae el token
        secretOrKey: 'coderSecret' // Esta clave era, por error, distinta a la del jwt generator y eso hacía que me tire bad token signature
    }, async(jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
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