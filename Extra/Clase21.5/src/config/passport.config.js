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
        // let user = await userService.findById(id);
        let user = await userModel.findById(id);
        done(null, user);
    })

    passport.use('github', new userService({
        clientID: "Iv1.c1e1f5a89a90786e",
        clientSecret: "3083a777e50b9dea91e96f2d39e80a5e5c397ed6",
        callbackURL: "http://localhost:8080/api/session/github"
    }, async(accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile);
            let user = await userModel.findOne({email: profile._json.email});
            if (!user) {
                let newUser = {
                    first_name: profile._json.name,
                    last_name: profile._json.last_name || "Bastan",
                    age: 18,
                    email: profile._json.email,
                    password: "5"
                }
                console.log(newUser);
                let result = await userModel.create(newUser);
                done(null, result);
            } else {
                done(null, user);
            }
        } catch(error) {
            return done(error); 
        }
    }))
}

export default initPassport;