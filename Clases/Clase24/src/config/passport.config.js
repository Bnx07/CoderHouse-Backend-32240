import passport from 'passport';
import local from 'passport-local';
import Users from '../dao/dbManagers/users.js';
import { isValidPassword, createHash } from '../utils.js';

const localStrategy = local.Strategy;
const userService = new Users();

const initializePassport = async() => {
    passport.use('register', new localStrategy({passReqToCallback: true, usernameField: 'email', session: false},
    async(req, email, password, done) => {
        try {

            if (!first_name || !last_name || !age) {
                return done(null, false, {status: "error", message: "Complete all fields"});
            }
            const exists = await userService.getById({email: email});
            if (exists) return done(null, false, "That email is already in use");
            const hashedPassword = await createHash(password);

            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password: hashedPassword
            }

            let result = await userService.saveUser(newUser);
            return done(null, result);

        } catch(error) {
            done(error)
        }
    }
    ))

    passport.use('login', new localStrategy({usernameField: 'email', session: false}, 
    async(email, password, done) => {
        try {
            const user = userService.getById(email);
            if (!user) return done(null, false, {message: 'User not found'});
            
            const passwordValid = isValidPassword(user, password);

            if (!passwordValid) return done(null, false, {message: 'The password doesnt match'});
            return done(null, user);

        } catch(error) {
            done(error)
        }
    }
    ))

    passport.serializeUser((user, done) => {
        done(null, user._id);
    })

    passport.deserializeUser(async(id, done) => {
        let result = await userService.findOne({_id: id});
    })
}

export default initializePassport;