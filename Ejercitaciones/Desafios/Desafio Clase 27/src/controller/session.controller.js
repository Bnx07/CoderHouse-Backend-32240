import jwt from 'jsonwebtoken';
import config from '../config/config.js';

export default class SessionController {
    getCurrent = async(req, res) => {
        res.send(req.user);
    }

    getFailedLogin = async(req, res) => {
        res.send({status: 'error'});
    }

    getFailedRegister = async(req, res) => {
        res.send({status: 'error'});
    }

    postRegister = async(req, res) => {
        return res.status(200).send({status: "Ok", message: req.newUser});
    }

    postLogin = async(req, res) => {
        const user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            role: req.user.role,
            email: req.user.email,
            cart: req.user.cart
        };
    
        let token = jwt.sign({user}, config.jwtKey, {expiresIn: "24h"});
        return res.cookie('coderCookieToken', token, {maxAge: 1000*60*24, httpOnly: true}).send({status: "Ok", message: "Logged in", payload: user});
    }

    postLogout = async(req, res) => {
        res.clearCookie("coderCookieToken")
        return res.send({status: "Ok", message: "Logged out"});
    }
}