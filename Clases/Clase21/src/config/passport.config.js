// import passport from "passport";
// import local from "passport-local";
// import userModel from "../dao/models/user.js";
// import {createHash, isValidPassword} from "../utils.js";
// import userService from 'passport-github2';

// const localStrategy = local.Strategy;
// const initPassport = () => {

//     passport.serializeUser((user, done) => {
//         done(null, user._id);
//     });

//     passport.deserializeUser(async(id, done) => {
//         let user = await userModel.findById(id);
//         done(null, user);
//     })

//     passport.use('github', new userService({
//         clientID: "Iv1.13915d10c3389be8",
//         clientSecret: "97650330b30e991b54411d3c50bf65ed8528d5f3",
//         callbackURL: "http://localhost:8080/api/session/github"
//     }, async(accessToken, refreshToken, profile, done) => {
//         try {
//             console.log(profile);
//             let user = await userModel.findOne({email: profile._json.email});
//             console.log("Usuario")
//             console.log(user)
//             if (!user) {
//                 let newUser = {
//                     first_name: profile._json.name,
//                     last_name: profile._json.last_name || "Bastan",
//                     age: 18,
//                     email: profile._json.email,
//                     password: ""
//                 }
//                 console.log(newUser);
//                 let result = await userModel.create(newUser);
//                 done(null, result);
//             } else {
//                 done(null, user);
//             }
//         } catch(error) {
//             return done(error);
//         }
//     }))
// }

// export default initPassport;

import passport from "passport";
import local from 'passport-local';
import userModel from '../dao/models/user.js';
import { createHash, isValidPassword } from '../utils.js';
import githubService from 'passport-github2';

const initPassport = () => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await userModel.findById(id);
    done(null, user);
  });

  passport.use('github', new githubService({
    clientID: 'Iv1.13915d10c3389be8',
    clientSecret: '97650330b30e991b54411d3c50bf65ed8528d5f3',
    callbackURL: 'http://localhost:8080/api/sessions/'
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      console.log(profile);
      let user = await userModel.findOne({ email: profile._json.email });
      if (!user) {
        let newUser = {
          first_name: profile._json.name,
          last_name: '1',
          age: 10,
          email: profile._json.email,
          password: '2'
        };
        let result = await userModel.create(newUser);
        done(null, result);
      }
      else {
        done(null, user);
      }
    }
    catch (err) {
      return done(err);
    }
  }
  ));
};
export default initPassport;