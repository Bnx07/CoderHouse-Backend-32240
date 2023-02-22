import { Router } from "express";
import Product from "../dao/dbManagers/products.js";
import Cart from "../dao/dbManagers/carts.js";
const pm = new Product();
const cm = new Cart();

const router = Router();

router.get('/', async (req, res) => { // Funciona
    const isLogin = req.session.user ? true : false;
    const user = req.session.user;

    try {
        let {limit = 10, page = 1, query = 'none', sort} = req.query;
        let products;
    
        if (query != "none") {
            JSON.parse(query);
            products = await pm.getDeterminate(limit, page, query, sort);
        } else {
            products = await pm.getDeterminate(limit, page, undefined, sort);
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

router.get('/realTimeProducts', (req, res) => { // Funciona
    const isLogin = req.session.user ? true : false;
    const user = req.session.user;
    res.render('realTimeProducts', {isLogin, user});
})

router.get('/chat', (req, res) => { // Funciona
    const isLogin = req.session.user ? true : false;
    const user = req.session.user;
    res.render('chat', {isLogin, user});
})

router.get('/carts/:cid', async (req, res) => { // Funciona
    try {
        const isLogin = req.session.user ? true : false;
        const user = req.session.user;
        let cid = req.params.cid;
        // Revisar que exista cid
        let cart = await cm.getOne(cid);
        res.render('carts', {cart, isLogin, user});
    } catch {
        res.render('error');
    }
})

router.get('/product/:pid', async (req, res) => { // Funciona
    try {
        const isLogin = req.session.user ? true : false;
        const user = req.session.user;
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

router.get('/user', (req, res) => {
    const isLogin = req.session.user ? true : false;
    if (isLogin == false) {
        return res.render('login');
    }
    const user = req.session.user;

    let isAdmin = false;
    if (user.role == "admin") {
        isAdmin = true;
    }

    res.render('user', {user, isAdmin})
})

export default router;