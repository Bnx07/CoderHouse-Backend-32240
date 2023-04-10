import { CartsService as cm, ProductsService as pm } from '../dao/repository/index.js';

export default class ViewController {
    get = async(req, res) => {
        let isLogin;
        let user;
        
        if (!req.user) {
            isLogin = false;
            user = {};
        } else {
            isLogin = true
            user = req.user;
        }
    
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
            console.log(error)
            res.render('error');
        }
    }

    getCart = async(req, res) => {
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
        try {
            let cart = await cm.getOne(cid);
            res.render('carts', {cart, isLogin, user}); // Hacer que renderice los productos y tengas el carts/purchase
        } catch {
            res.render('error');
        }
    }

    getProduct = async(req, res) => {
        let isLogin;
        let user;
        
        if (!req.user) {
            isLogin = false;
            user = {};
        } else {
            isLogin = true
            user = req.user;
        }

        try {
            let pid = req.params.pid;
            let product = await pm.getOne(pid);
            let cartId = user.cart[0];
            res.render('product', {product, isLogin, user, cartId});
        } catch {
            res.render('error');
        }
    }

    getLogin = (req, res) => {
        res.render('login');
    }

    getRegister = (req, res) => {
        res.render('register');
    }

    getUser = async(req, res) => {
        let isLogin;
        let user;
        
        if (!req.user) {
            isLogin = false;
            user = {};
        } else {
            isLogin = true
            user = req.user;
        }
    
        if (!isLogin) {
            return res.render('login');
        }
    
        let isAdmin = false;
        if (user.role == "admin") {
            isAdmin = true;
        }
    
        res.render('user', {user, isAdmin})
    }

    getChat = (req, res) => {
        let user;
        
        if (!req.user) {
            user = {};
        } else {
            user = req.user;
        }

        res.render('chat', {user});
    }

    getAll = (req, res) => {
        res.render('NotFound');

    }
}