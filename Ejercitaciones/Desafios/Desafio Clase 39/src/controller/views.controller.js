import jwt from 'jsonwebtoken'
import config from '../config/config.js';
import { CartsService as cm, ProductsService as pm } from '../dao/repository/index.js';
import { CustomError, generateErrorInfo } from '../utils/errors.js';

export default class ViewController {
    get = async(req, res, next) => {
        req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);

        try {
            let isLogin;
            let user;
            
            if (!req.user) {
                isLogin = false;
                user = {};
            } else {
                isLogin = true
                user = req.user;
            }

            let {limit = 10, page = 1, query = 'none', sort} = req.query;
            let products;
        
            if (query != "none") {
                JSON.parse(query);
                products = await pm.getSome(limit, page, query, sort);
            } else {
                products = await pm.getSome(limit, page, undefined, sort);
            }
        
            page = parseInt(page);
            let nextLink, prevLink;
            (products.hasNextPage == true ) ? nextLink = `http://localhost:8080/?limit=${limit}&page=${page+1}&query=${query}` : nextLink = null;
            (products.hasPrevPage == true ) ? prevLink = `http://localhost:8080/?limit=${limit}&page=${page-1}&query=${query}` : prevLink = null;
        
            let hasNextPage = products.hasNextPage, hasPrevPage = products.hasPrevPage;
            products = products.docs;
        
            res.render('home', {products, hasNextPage, hasPrevPage, nextLink, prevLink, page, isLogin, user});
        } catch(error) {
            req.logger.debug(error);
            next(error);
        }
    }

    getCart = async(req, res, next) => {
        req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);

        try {
            let isLogin;
            let user;
            
            if (!req.user) {
                isLogin = false;
                user = {};
            } else {
                isLogin = true
                user = req.user;
            }

            let cid = req.params.cid;
            let cart = await cm.getOne(cid);
            res.render('carts', {cart, isLogin, user}); // Hacer que renderice los productos y tengas el carts/purchase
        } catch(error) {
            next(error)
        }
    }

    getProduct = async(req, res, next) => {
        req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);

        try {
            let isLogin;
            let user;
            
            if (!req.user) {
                isLogin = false;
                user = {};
            } else {
                isLogin = true
                user = req.user;
            }
            let pid = req.params.pid;
            let product = await pm.getOne(pid);
            let cartId = user.cart[0];
            res.render('product', {product, isLogin, user, cartId});
        } catch(error) {
            next(error)
        }
    }

    getLogin = (req, res) => {
        req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);

        res.render('login');
    }

    getRegister = (req, res) => {
        req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);

        res.render('register');
    }

    getUser = async(req, res) => {
        req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);

        let isLogin;
        let user;
        
        req.logger.debug(`req.user: ${req.user}`)

        if (!req.user) {
            isLogin = false;
            user = {};
        } else {
            isLogin = true
            user = req.user;
        }
    
        req.logger.debug(`User: ${user}`);

        if (!isLogin) {
            return res.render('login');
        }
    
        let isAdmin = false;
        let isPremium = false;
        if (user.role == "admin") {
            isAdmin = true;
        } else if (user.role == "premium") {
            isPremium = true;
        }
    
        req.logger.debug(`User email: ${user.email}`);
        req.logger.debug(`User role: ${user.role}`);

        res.render('user', {user, isAdmin, isPremium});
    }

    getChat = (req, res, next) => {
        req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);

        try {
            let user;
            
            if (!req.user) {
                user = {};
                CustomError.createError({ statusCode: 401, name: "You need to be logged in", cause: generateErrorInfo.unauthorized(), code: 6});
                req.logger.error(`Se ha intentado entrar sin iniciar sesión a ${req.url}`);
            }
            
            user = req.user;

            res.render('chat', {user});
        } catch(error) {
           next() 
        }
    }

    getAll = (req, res) => {
        req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);

        res.render('notFound');
    }

    getUnauthorized = (req, res) => {
        req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);

        res.render('unauthorized');
    }

    getRecover = (req, res) => {
        req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);

        res.render("recover")
    }

    getRecoverLanding = (req, res) => {
        req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);

        try {
            let token = req.params.token;
            req.logger.debug(token);
            
            let result;

            jwt.verify(token, config.jwtKey, function(error, decoded) {
                if (error) {
                    if (error instanceof jwt.TokenExpiredError) {
                        result = "EXPIRED";
                    }
                } else {
                    result = decoded;
                }
            });

            if (result == "EXPIRED") {
                req.logger.debug("Expiró")
                let hasExpired = true;
                return res.render('recoverLanding', {hasExpired});
            }

            res.render('recoverLanding', {token});
        } catch (error) {
            req.logger.error(error);
            res.render('error');
        }
    }
}