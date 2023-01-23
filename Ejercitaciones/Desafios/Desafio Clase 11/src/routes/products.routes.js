import { Router } from "express";
import ProductManager from "../productManager.js";
import {io} from '../app.js'
// http://localhost:8080/api/products?title=papa&description=POTATO&code=ab2&price=2&stock=2&category=potatos
// const socket = io() // || io.connect('http://localhost:8080'); // Lineas 4; 63; 90; 105 
const pm = new ProductManager('../');
const router = Router();

router.get('/', async(req, res) => { // EN TEORIA DEBERIA FUNCIONAR
    const query = req.query;
    let products = await pm.getProducts();

    if (products == false) {
        res.send({status: 500, message: 'File not found'});
    } else {
        if (!query.limit) {
            console.log(query.limit);
            res.send(products);
        } else {
            let limitedArray = products.slice(0, query.limit);
            res.send({status: "Ok", message: limitedArray});
        }
    }
})

router.get('/:pid', async(req, res) => { // EN TEORIA DEBERIA FUNCIONAR
    let productId = req.params.pid;
    productId = parseInt(productId);

    if (isNaN(productId)) {
        res.send({status: 404, message: 'ID has to be a number'});
    } else {
        let product = await pm.getProductById(productId);
        if (product == false) {
            res.send({status: 500, message: 'Server cant find the file'});
        } else {
            res.send(product);
        }
    }
})

router.post('/', async(req, res) => { // EN TEORIA FUNCIONA FALTAN CAMPOS REVISAR ENTREGABLE
    let product = req.query;
    if (!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category) {
        res.send({status: 404, message: 'Fill all params'});
    } else {
        if (!product.status) {
            product.status = true; // Status se crea obligatoriamente, por defecto como true, igualmente si se crea se revisa
        } else {
            product.status = (product.status === 'true');
        }
        if (!product.thumbnails) {
            product.thumbnails = [];
        } else {
            product.thumbnails = [product.thumbnails];
        }
        product.price = parseInt(product.price);
        product.stock = parseInt(product.stock);
        if (isNaN(product.price) || isNaN(product.stock)) { // http://localhost:8080/api/products?title=papa&description=POTATO&code=ab2&price=2
            res.send({status: 404, message: 'Price and stock need to be numbers'});
        } else {   
            let response = await pm.addProduct(product);
            res.send({status: 200, message: response});
            let products = await pm.getProducts();
            io.emit('products', products);
            console.log(response);
        }
    }
})

router.put('/:pid', async(req, res) => { // HACER QUE MANDE ID Y OBJETO entonces revisa que tiene el objeto para actualizar
    let query = req.query;
    let productId = req.params.pid;
    productId = parseInt(productId);

    if (query.price) {
        query.price = parseInt(query.price);

        if (isNaN(query.price)) {
            res.send({status: 404, message: 'Price has to be a number'});
        }
    }
    if (query.stock) {
        query.stock = parseInt(query.stock);

        if (isNaN(query.stock)) {
            res.send({status: 404, message: 'Stock has to be a number'});
        }
    }

    let response = await pm.updateProduct(productId, query)
    res.send(response);
    let products = await pm.getProducts();
    io.emit('products', products);
})

router.delete('/:pid', async(req, res) => { // EN TEORIA DEBERIA FUNCIONAR
    let productId = req.params.pid;
    productId = parseInt(productId);

    if (isNaN(productId)) {
        res.send({status: 404, message: 'ID has to be a number'});
    } else {
        let response = await pm.deleteProduct(productId);
        if (response == false) {
            res.send({status: 500, message: 'Server cant find the file'});
        } else {
            res.send(response);
            let products = await pm.getProducts();
            io.emit('products', products);
        }
    } 
})

export default router;