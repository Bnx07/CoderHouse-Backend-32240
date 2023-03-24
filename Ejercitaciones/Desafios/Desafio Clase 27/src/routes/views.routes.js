import { Router } from "express";
import Product from "../dao/dbManagers/products.js";
import Cart from "../dao/dbManagers/carts.js";
import { cookieExtractor } from '../config/passport.config.js';
import passport from "passport";
const pm = new Product();
const cm = new Cart();

const router = Router();

router.get('/', passport.authenticate('jwt', {session: false}), async (req, res) => { // Funciona
    const isLogin = req.user.user ? true : false;
    const user = req.user.user;

    try {
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
        res.render('error');
    }
})

router.get('/:uid/carts/:cid', passport.authenticate('jwt', {session: false}), async (req, res) => { // Funciona
    let {cid, uid} = req.params.cid;
    try {
        const isLogin = req.user.user ? true : false;
        const user = req.user.user;
        let cart = await cm.getOne(cid);
        res.render('carts', {cart, isLogin, user});
    } catch {
        res.render('error');
    }
})

router.get('/product/:pid', passport.authenticate('jwt', {session: false}), async (req, res) => { // Funciona
    try {
        const isLogin = req.user.user ? true : false;
        const user = req.user.user;
        let pid = req.params.pid;
        let product = await pm.getOne(pid);
        res.render('product', {product, isLogin, user});
    } catch {
        res.render('error');
    }  
})

router.get('/register', (req, res) => {
    res.render('register');
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/user', passport.authenticate('jwt', {session: false}), (req, res) => {
    const isLogin = req.user.user ? true : false;
    if (isLogin == false) {
        return res.render('login');
    }
    const user = req.user.user;

    let isAdmin = false;
    if (user.role == "admin") {
        isAdmin = true;
    }

    res.render('user', {user, isAdmin})
})

router.get('*', (req, res) => {
    res.render('NotFound');
})

export default router;