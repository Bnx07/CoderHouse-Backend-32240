import { Router } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

const router = Router();

// Tanto login como register rompen cuando ya existe la cuenta porque los parametros devueltos no pueden pasar por el .json()
// Current no funciona
// Agregar el isLogin y user al views.routes.js

router.post('/register', passport.authenticate('register', {session: false, passReqToCallback: true}), async(req, res) => {
    return res.status(200).send({status: "Ok", message: req.newUser});
})

router.post('/login', passport.authenticate('login', {session: false, failureRedirect: 'register'}), async(req, res) => {
    console.log(req.user)
    const user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        role: req.user.role,
        email: req.user.email,
        cart: req.user.cart
    };
    console.log(user);

    let token = jwt.sign({user}, 'coderSecret', {expiresIn: "24h"});
    return res.cookie('coderCookieToken', token, {maxAge: 60*60*24, httpOnly: true}).send({status: "Ok", message: "Logged in", payload: user});
})

router.post('/logout', async(req, res) => {
    req.session.destroy((error) => {
        if (!error) {
            res.clearCookie("connect.sid")
            return res.send({status: "Ok", message: "Logged out"});
        } else {
            res.send({status: 500, error: "An error has ocurred while logging out"});
        }
    })
})

router.get('/current', passport.authenticate('jwt'), (req, res) => {
    res.send(req.user);
});

export default router;