import jwt from 'jsonwebtoken'
import config from '../config/config.js';
import userManager from "../dao/dbManagers/users.js";
import { isValidPassword } from "../utils/utils.js";

const um = new userManager();

export const recoverPassword = async(req, res, next) => {
    req.logger.debug("EMPIEZA EL RECOVERPASSWORD");

    let token = req.body.token;
    let password = req.body.password;

    if (password.trim() == 0) return res.send({status: "error", message: "La contraseña no puede estar vacia"});

    let result;

    console.log("Verificacion");
    jwt.verify(token, config.jwtKey, function(error, decoded) {
        req.logger.debug("El token es");
        req.logger.debug(token)
        if (error) {
            if (error instanceof jwt.TokenExpiredError) {
                result = "EXPIRED";
                req.logger.debug("Expiro");
            }
        } else {
            req.logger.debug("No expiro");
            result = decoded;
        }
    });

    if (result == "EXPIRED") return res.send({status: "error", message: "El token expiro"});

    let email = result.email;

    let account = await um.getOne({email});

    if (!account) return res.send({status: "error", message: "La cuenta ya no existe"});
    
    if (isValidPassword(account, password)) return res.send({status: "error", message: "La contraseña es la misma"});

    req.account = account;
    req.password = password;

    next();
}