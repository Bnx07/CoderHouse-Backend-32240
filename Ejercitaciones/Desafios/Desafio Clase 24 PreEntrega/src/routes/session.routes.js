import { Router } from 'express';
import userManager from "../dao/dbManagers/users.js";
import CartManager from '../dao/dbManagers/carts.js';
import { createHash, isValidPassword } from '../utils.js';
import jwt from 'jsonwebtoken';
import passport from 'passport';

const router = Router();
const um = new userManager();
const cm = new CartManager();

router.post('/register', async(req, res) => {
    let {first_name, last_name, age, email, password} = req.body;

    if (!first_name || !last_name || !age || !email || !password) return res.send({status: "Error", error: "Some data is missing"});

    const exists = await um.findUser({email});

    if (exists != null) return res.send({status: "Error", error: "The email is already used"});

    let cartObj = await cm.createCart(); // Puede que rompa por no tener params

    let cart = cartObj._id

    password = createHash(password);

    const result = await um.addUser({
        first_name,
        last_name,
        email,
        age,
        password,
        cart
    })
    console.log(result)

    return res.status(200).send({status: "Ok", message: result});
})

router.post('/login', async(req, res) => {
    const {email, password} = req.body;

    if (!email || !password) res.send({status: "Error", error: "Some data is missing"});

    const user = await um.findUser({email});

    if (!isValidPassword(user, password)) {
        return res.send({status: "Error", error: "Password invalid"});
    }

    if (!user) return res.send({status: "Error", error: "Email invalid"});

    delete user.password;

    let token = jwt.sign({user}, 'coderSecret', {expiresIn: "24h"});
    return res.cookie('coderCookieToken', token, {maxAge: 60*60*24}).send({status: "Ok", message: "Logged in"});
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