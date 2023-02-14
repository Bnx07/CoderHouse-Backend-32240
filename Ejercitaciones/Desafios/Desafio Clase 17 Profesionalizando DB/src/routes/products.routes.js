import { Router } from "express";
import Product from "../dao/dbManagers/products.js";
import { io } from "../app.js";

const pm = new Product();

const router = Router();

// MeterLasFuncionesEnUnTryCatchParaQueNoRevienteTodo

router.get('/', async(req, res) => { // Funciona excepto porque los links están deformes al tener ""
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
    let queryString = query.replace(/"/, '%22');
    (products.hasNextPage == true ) ? nextLink = `http://localhost:8080/api/products/?limit=${limit}&page=${page+1}&query=${queryString}` : nextLink = null;
    (products.hasPrevPage == true ) ? prevLink = `http://localhost:8080/api/products/?limit=${limit}&page=${page-1}&query=${queryString}` : prevLink = null;
    
    (!products)?res.status(500).send({status: "Error", error: "No info avaliable"}):res.send({status: "Ok", payload: products.docs, totalPages: products.totalPages, prevPage: products.prevPage, nextPage: products.nextPage, page: products.page, hasPrevPage: products.hasPrevPage, hasNextPage: products.hasNextPage, nextLink: nextLink, prevLink: prevLink});
})

router.post('/', async(req, res) => { // Funciona
    const {title, description, code, price, stock, thumbnails} = req.body;
    let newProduct = {
        title,
        description,
        code,
        price,
        stock,
        thumbnails
    }

    if (!title || !description || !code || !price || !stock) {
        res.send({status: 404, payload: "Some data is missing"});
    } else {
        const result = await pm.saveProduct(newProduct);
        res.send({status: "Ok", payload: result});
    }
    let products = await pm.getAll();
    io.emit('products', products);
})

router.put('/:pid', async(req, res) => { // Funciona
    const id = req.params.pid;

    const {title, description, code, price, stock, thumbnails} = req.body;
    let newProduct = {
        title,
        description,
        code,
        price,
        stock,
        thumbnails
    }

    let result = await pm.updateProduct(id, newProduct);
    res.send({status: "Ok", payload: result});
    let products = await pm.getAll();
    io.emit('products', products);
})

router.delete('/:pid', async(req, res) => { // Funciona
    const id = req.params.pid;

    let result = await pm.deleteProduct(id);
    res.send({status: "Ok", payload: result});
    let products = await pm.getAll();
    io.emit('products', products);
})

export default router;