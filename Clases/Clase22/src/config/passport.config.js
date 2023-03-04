import passport from "passport";
import jwt from 'passport-jwt';

const jwtStrategy = jwt.Strategy;
const extractJwt = jwt.ExtractJwt;

const initPassport = () => {
    passport.use('jwt', new jwtStrategy({
      jwtFromRequest:extractJwt.fromExtractors([]),
      secretOrKey: 'S3cretCod3r'
    }, async(jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error);
        }
    }));
}

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['coderCookieToken'];
    }
    return token
}

export default initPassport;