import passport from "passport";
import local from "passport-local";
import userModel from "../dao/models/user.js";
import {createHash, isValidPassword} from "../utils.js";

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
}

export default initPassport;