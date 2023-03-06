import passport from "passport";
import local from "passport-local";
import userModel from "../dao/models/user.js";
import {createHash, isValidPassword} from "../utils.js";
import userService from 'passport-github2';

const localStrategy = local.Strategy;
const initPassport = () => {

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async(id, done) => {
        let user = await userModel.findById(id)
        done(null, user);
    });

    passport.use('github', new userService({
        clientID: "Iv1.c1e1f5a89a90786e",
        clientSecret: "3083a777e50b9dea91e96f2d39e80a5e5c397ed6",
        callbackURL: "http://localhost:8080/api/session/githubcallback"
    }, async(req, accessToken, refreshToken, profile, done) => {
        // let {password = "10"} = req.body;
        let password = "10"
        try {
            let user = await userModel.findOne({email: profile._json.email});
            if (!user) {
                let newUser = {
                    first_name: profile._json.name,
                    last_name: profile._json.last_name || "Bastan",
                    age: 18,
                    email: profile._json.email,
                    password: createHash(password)
                }
                let result = await userModel.create(newUser);
                done(null, result);
            } else {
                done(null, user);
            }
        } catch(error) {
            return done(error); 
        }
    }))

    passport.use('register', new localStrategy(
        {passReqToCallback: true, usernameField: 'email'}, async(req, something, username, done) => {
            const {first_name, last_name, age, email, password} = req.body;
            try {
                let user = await userModel.findOne({email: email});
                if (user != null) {
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
                done(error)
            }
        }
    ))

    passport.use('login', new localStrategy(
        {passReqToCallback: true, usernameField: 'email'}, async(req, something, password, done) => {
            const {email} = req.body;
            try {
                const user = await userModel.findOne({email: email})
                if (!user) {
                    console.log("El usuario no existe");
                    return done(null, false);
                }

                if (!isValidPassword(user, password)) return done(null, false);

                console.log("Entre")
                return done(null, user);
            } catch(error) {
                return done("Oops")
            }
        }
    ))
}

export default initPassport;