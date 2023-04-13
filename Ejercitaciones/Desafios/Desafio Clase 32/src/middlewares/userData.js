import jwt from 'jsonwebtoken';
import config from "../config/config.js";

export const userData = (req, res, next) => {
    const cookie = req.cookies["coderCookieToken"];

    let isLogin;
    let user;
    if (!cookie) {
        isLogin = false;
        user = {};
        req.user = false;
        next();
    } else {
        isLogin = true;
        user = jwt.verify(cookie, config.jwtKey);
        req.user = user.user;
        next();
    }
}
