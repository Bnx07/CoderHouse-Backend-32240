import { Router } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

const router = Router();

// Tanto login como register rompen cuando ya existe la cuenta porque los parametros devueltos no pueden pasar por el .json()
// Agregar el isLogin y user al views.routes.js

router.post('/register', passport.authenticate('register', {session: false, passReqToCallback: true, failureRedirect: 'failedLogin'}), async(req, res) => {
    return res.status(200).send({status: "Ok", message: req.newUser});
})

router.post('/login', passport.authenticate('login', {session: false, failureRedirect: 'failedRegister'}), async(req, res) => {
    const user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        role: req.user.role,
        email: req.user.email,
        cart: req.user.cart
    };

    let token = jwt.sign({user}, 'coderSecret', {expiresIn: "24h"});
    return res.cookie('coderCookieToken', token, {maxAge: 1000*60*24, httpOnly: true}).send({status: "Ok", message: "Logged in", payload: user});
})

router.post('/logout', async(req, res) => {
    res.clearCookie("coderCookieToken")
    return res.send({status: "Ok", message: "Logged out"});
})

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.send(req.user);
});

router.get('/failedRegister', (req, res) => {
    res.send({status: 'error'});
})

router.get('/failedLogin', (req, res) => {
    res.send({status: 'error'});
})

export default router;