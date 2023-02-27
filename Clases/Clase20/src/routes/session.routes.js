import {Router} from 'express';
import userModel from '../dao/models/user.js'
import { createHash, isValidPassword } from '../utils.js';
import passport from 'passport';

const router = Router()

router.post('/register', passport.authenticate('register', {failureRedirect: '/failRegister'}) , async(req, res) => {
    res.status(200).send({status: "Ok", message: "User registered"});
})

router.get('/failRegister', (req, res) => {
    console.log("There was an error in the strategy");
    res.send({error: "Failed"});
})

router.post('/login', passport.authenticate('login', {failureRedirect: '/failLogin'}) , async(req, res) => {
    const {email, password} = req.body;

    if (!req.user) return res.status(400).send({status: "Error", error: "Some data is missing"});

    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email
    }

    res.status(200).send({status: "Ok", message: "Logged in", payload: req.user})
    
    // delete user.password; // Elimina el campo password para que no se guarde un dato errado en el session.user
    // req.session.user = user;
})

router.get('failLogin', (req, res) => {
    console.log("There was an error in the strategy");
    res.send({error: "Failed"});
})

router.post('/recover', async(req, res) => {
    const {email, password} = req.body;

    if (!email || !password) return res.status(400).send({status: "Error", error: "Some data is missing"});

    const user = await userModel.findOne({email});

    user.password = createHash(password);
    console.log(user.password);

    let result = await userModel.updateOne({email}, user);
    res.send(result);
})

export default router;