import jwt from 'jsonwebtoken';
import Dto from '../dao/dto/dto.js';

import config from '../config/config.js';
import { transport } from '../utils/utils.js';
import { CustomError, errorCodes, generateErrorInfo } from '../utils/errors.js';
import { createHash } from '../utils/utils.js';
import userManager from "../dao/dbManagers/users.js";
const um = new userManager();

const dto = new Dto;

export default class SessionController {
    getCurrent = async(req, res) => {
        req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);

        res.send(dto.getCurrent(req.user.user));
    }
    
    postRegister = async(req, res, next) => {
        req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);
        
        try {
            try {
                await transport.sendMail({
                    from: 'benjabastan@gmail.com',
                    to: req.user.email,
                    subject: 'Se ha creado una cuenta en Ecommerce Coder',
                    html: `
                    <div style="background-color: black; color: green; display: flex; flex-direction: column; justify-content: center;  align-items: center;">
                    <h1>Bienvenido a Ecommerce Coder</h1>
                    </div>
                    `
                });
            } catch {}
            
            return res.status(200).send({status: "Ok", message: req.newUser});
        } catch (error) {
            next(error);
        }
    }
    
    postLogin = async(req, res, next) => {
        req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);
        
        try {
            const user = {
                first_name: req.user.first_name,
                last_name: req.user.last_name,
                role: req.user.role,
                email: req.user.email,
                cart: req.user.cart
            };
            
            let token = jwt.sign({user}, config.jwtKey, {expiresIn: "24h"});
            
            await um.editLastConnection(user, new Date().toLocaleString())
            
            return res.cookie('coderCookieToken', token, {maxAge: 1000*60*24, httpOnly: true}).send({status: "Ok", message: "Logged in", payload: user});
        } catch (error) {
            next(error);
        }
    }
    
    postLogout = async(req, res, next) => {
        req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);
        
        try {
            res.clearCookie("coderCookieToken")
            return res.send({status: "Ok", message: "Logged out"});
        } catch (error) {
            next(error);
        }
    }
    
    postRecover = async(req, res, next) => {
        req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);
        req.logger.debug("Entre al recover")
        try {
            let email = req.user.email;
            let token = jwt.sign({email}, config.jwtKey, {expiresIn: "1h"});
            req.logger.debug("Pre nodemailer")
            try {
                transport.sendMail({from: 'benjabastan@gmail.com',
                to: email,
                subject: 'Reestablece tu contraseña',
                html: `
                <div style="background-color: black; color: green; display: flex; flex-direction: column; justify-content: center;  align-items: center;">
                <h1>Para reestablecer tu contraseña haz click <a href="http://localhost:8080/recoverLanding/${token}">aqui</a></h1>
                </div>
                `});
            } catch (error) {
                return res.send({status: "error", message: "El email es inválido"})
            }
            res.send({status: "Ok", message: "email enviado"});
        } catch (error) {
            next(error)
        }
    }
    
    postRecoverPassword = async(req, res, next) => {
        try {
            req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);
            
            let account = req.account;
            let password = req.password;
            
            account.password = createHash(password);
            
            let result = await um.editOne(account.email, account);
            
            if (result.acknowledged) res.send({status: "Ok", message: "Contraseña cambiada"});
        } catch(error) {
            next(error)
        }
    }
    
    postSwapUserClass = async(req, res, next) => {
        try {
            req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);
            
            let reqEmail = req.user.user.email;
            
            let email = req.params.uid;
            
            if (reqEmail != email) CustomError.createError({ statusCode: 401, name: "Admin users cant swap roles", cause: generateErrorInfo.unauthorized(), code: 6});
            
            let dbUser = await um.getOne({email});
            
            let user = {
                first_name: dbUser.first_name,
                last_name: dbUser.last_name,
                role: dbUser.role,
                email: dbUser.email,
                cart: dbUser.cart,
                documents: dbUser.documents
            }

            

            if (dbUser.role == "admin") CustomError.createError({ statusCode: 401, name: "Admin users cant swap roles", cause: generateErrorInfo.unauthorized(), code: 6});
            if (dbUser.role == "user") {

                console.log(user.documents)

                if (user.documents.lenght != 3) return res.send({ status: 'error', message: "Necesitas subir todos los documentos"});

                dbUser.role = "premium";
                let result = await um.editOne(email, dbUser);
                
                user.role = dbUser.role;
                let print = await um.getOne({email});
                req.logger.debug(print);
                
                let token = jwt.sign({user}, config.jwtKey, {expiresIn: "24h"});
                if (result.acknowledged) return res.cookie('coderCookieToken', token, {maxAge: 1000*60*24, httpOnly: true}).send({status: "Ok", message: "Rol actualizado"});
                
                CustomError.createError({ statusCode: 500, name: "Couldn't swap roles", cause: generateErrorInfo.dbNotChanged(), code: 3});
            }
            if (dbUser.role == "premium") {
                dbUser.role = "user";
                let result = await um.editOne(email, dbUser);
                
                user.role = dbUser.role;
                let print = await um.getOne({email});
                req.logger.debug(print);
                
                let token = jwt.sign({user}, config.jwtKey, {expiresIn: "24h"});
                if (result.acknowledged) return res.cookie('coderCookieToken', token, {maxAge: 1000*60*24, httpOnly: true}).send({status: "Ok", message: "Rol actualizado"});
                
                CustomError.createError({ statusCode: 500, name: "Couldn't swap roles", cause: generateErrorInfo.dbNotChanged(), code: 3});
            }
        } catch (error) {
            next(error)
        }
    }
    
    postAreDocumentsRepeated = async(req, res, next) => {
        try {
            req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);

            if (Object.getOwnPropertyNames(req.files).length == 0) return res.send({status: 'error', message: 'No se enviaron documentos'})

            let email = req.params.uid;
        
            let user = await um.getOne({email});
        
            let isValid = true;
            let repeatedDocs = [];
        
            user.documents.forEach(element => {
                if (req.files[element.name]) {
                    repeatedDocs.push(element.name);
                    isValid = false;
                }
            })
        
            if (!isValid) return res.send({status: 'error', message: `Los campos repetidos son ${repeatedDocs}`});
        
            res.send({status: 'Ok', message: 'All documents are new'});
        } catch (error) {
            next(error);
        }
    }

    postDocuments = async(req, res, next) => {        
        try {
            req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);

            let user = await um.getOne({email: req.user.email});

            let userDocuments = [];

            user.documents.forEach(element => {
                userDocuments.push(element.name);
            })
            
            if (req.files.identification) {
                let exists = userDocuments.findIndex(element => element == 'identification');
                let extension = req.files.identification[0].originalname.split('.');
                let file = {name: 'identification', reference: `/public/userImages/${req.user.email}-identification.${extension[1]}`};

                if (exists != -1) {
                    user.documents[exists] = file;
                } else {
                    user.documents.push(file);
                }
            }
            if (req.files.location) {
                let exists = userDocuments.findIndex(element => element == 'location');
                let extension = req.files.location[0].originalname.split('.');
                let file = {name: 'location', reference: `/public/userImages/${req.user.email}-location.${extension[1]}`};

                if (exists != -1) {
                    user.documents[exists] = file;
                } else {
                    user.documents.push(file);
                }
            }
            if (req.files.accState) {
                let exists = userDocuments.findIndex(element => element == 'accState');
                let extension = req.files.accState[0].originalname.split('.');
                let file = {name: 'accState', reference: `/public/userImages/${req.user.email}-accState.${extension[1]}`};

                if (exists != -1) {
                    user.documents[exists] = file;
                } else {
                    user.documents.push(file);
                }
            }

            um.editOne(user.email, user);

            res.send({status:'Ok', message: 'Archivos guardados correctamente'})
        } catch (error) {
            next(error);
        }
    }
}