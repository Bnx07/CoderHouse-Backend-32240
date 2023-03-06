import { Router } from "express";
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/login', (req, res) => {
    const {email, password} = req.body;

    if (email == "coder@coder.com" && password == "coderpass") {
        let token = jwt.sign({email, password}, 'coderSecret', {expiresIn: "24h"});
        // res.send({message: "Logged in succesfully", token: token});
        return res.cookie('coderCookieToken', token, {maxAge: 60*60*24}).send("Logged in");
    }

    res.send("Try using coder@coder.com coderpass");
});

export default router