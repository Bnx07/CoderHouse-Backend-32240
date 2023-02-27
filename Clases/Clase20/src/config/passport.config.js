import passport from "passport";
import local from "passport-local";
import userModel from "../dao/models/user.js";
import {createHash, isValidPassword} from "../utils";

const localStrategy = local.Strategy;
const initPassport = () => {

    passport.use('register', new localStrategy(
        {passReqToCallback: true, usernameField: 'email'}, async(req, username, password, done) => {
            const {first_name, last_name, age, email, password} = req.body;
            try {
                let user = await userModel.findOne({email: username});

                if (user) {
                    console.log("El usuario ya existe");
                    return done(null, false);
                }

                const result = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password)
                }

                let newUser = await userModel.create(result);

                return done(null, newUser);
            } catch(error) {
                return done("Error recovering user" + error)
            }
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser(async(user, done) => {
        let user = await userModel.findById(id)
        done(null, user);
    });

    passport.use('login', new localStrategy(
        {passReqToCallback: true, usernameField: 'email'}, async(username, password, done) => {
            try {
                const user = await userModel.findOne({email: username})
                if (!user) {
                    console.log("El usuario no existe");
                    return done(null, false);
                }

                if (!isValidPassword(user, password)) return done(null, false);

                return done(null, user);
            } catch(error) {
                return done("Error recovering user" + error)
            }
        }
    ))
}

export default initPassport;