import Product from "../dao/dbManagers/products.js";
import Cart from "../dao/dbManagers/carts.js";
const pm = new Product();
const cm = new Cart();

export default class ViewController {
    get = async(req, res) => {
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
            console.log(error)
            res.render('error');
        }
    }

    getCart = async(req, res) => {
        let cid = req.params.cid;
        try {
            const isLogin = req.user.user ? true : false;
            const user = req.user.user;
            let cart = await cm.getOne(cid);
            res.render('carts', {cart, isLogin, user}); // Hacer que renderice los productos y tengas el carts/purchase
        } catch {
            res.render('error');
        }
    }

    getProduct = async(req, res) => {
        try {
            const isLogin = req.user.user ? true : false;
            const user = req.user.user;
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
    }

    getChat = (req, res) => {
        let user = req.user.user;
        console.log(user)
        res.render('chat', {user});
    }

    getAll = (req, res) => {
        res.render('NotFound');

    }
}