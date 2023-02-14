import { Router } from "express";
import Product from "../dao/dbManagers/products.js";
import Cart from "../dao/dbManagers/carts.js";
const pm = new Product();
const cm = new Cart();

const router = Router();

// MeterLasFuncionesEnUnTryCatchParaQueNoRevienteTodo

router.get('/', async (req, res) => { // Funciona
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

    res.render('home', {products, hasNextPage, hasPrevPage, nextLink, prevLink});
})

router.get('/realTimeProducts', (req, res) => { // Funciona
    res.render('realTimeProducts');
})

router.get('/chat', (req, res) => { // Funciona
    res.render('chat');
})

router.get('/carts/:cid', async (req, res) => { // Hay que hacer que funcione con populate
    let cid = req.params.cid;
    // Revisar que exista cid
    let cart = await cm.getOne(cid);
    console.log(cart)
    res.render('carts', {cart});
})

router.get('/product/:pid', async (req, res) => { // Funciona excepto agregar al carrito
    let pid = req.params.pid;
    let product = await pm.getOne(pid);
    res.render('product', product);
})

export default router;