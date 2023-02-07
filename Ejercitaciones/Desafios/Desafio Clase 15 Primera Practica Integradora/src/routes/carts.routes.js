import { Router } from "express";
import Cart from "../dao/dbManagers/carts.js";
import Product from "../dao/dbManagers/products.js";

const router = Router();
const cm = new Cart();
const pm = new Product();

router.get('/', async(req, res) => { // Funciona
    let carts = await cm.getAll();

    (!carts)?res.status(500).send({status: "Error", error: "No info avaliable"}):res.send({status: "Ok", payload: carts});
})

router.post('/', async(req, res) => { // Funciona
    let result = await cm.createCart();
    res.send({status: "Ok", payload: result});
})

router.put('/:cid/product/:pid', async(req, res) => { // Funciona
    const id = req.params.cid;
    let productId = req.params.pid;

    let productExist = await pm.getOne(productId);
    
    if (!productExist) {
        res.send({status: 404, payload: "Product doesnt exist"});
    } else {
        let cart = await cm.getOne(id);

        if (!cart) {
            res.send({status: 404, payload: "Cart doesnt exist"});
        } else {
            let productsInCart = cart.products.toObject();
            let exists = false;
            productsInCart.forEach(element => {
                if (element.id == productId) {
                    exists = true;
                    element.quantity += 1;
                }
            });
            if (exists !== true) {
                productsInCart.push({id: productId, quantity: 1});
            }
            cart.products = productsInCart;
            let result = await cm.updateCart(id, cart);
            res.send({status: "Ok", payload: result});
        }
    }
})

router.delete('/:cid/product/:pid', async(req, res) => { // Funciona
    const id = req.params.cid;
    let productId = req.params.pid;

    let productExist = await pm.getOne(productId);
    
    if (!productExist) {
        res.send({status: 404, payload: "Product doesnt exist"});
    } else {
        let cart = await cm.getOne(id);

        if (!cart) {
            res.send({status: 404, payload: "Cart doesnt exist"});
        } else {
            let productsInCart = cart.products.toObject();
            productsInCart.forEach(element => {
                if (element.id == productId) {
                    if (element.quantity > 1) {
                        element.quantity -= 1;
                    } else {
                        let idToSearch = (element) => element.id === productId;
                        let position = productsInCart.findIndex(idToSearch);
                        productsInCart.splice(position, 1);
                    }
                }
            });
            cart.products = productsInCart;
            let result = await cm.updateCart(id, cart);
            
            if (result.modifiedCount == 0) {
                res.send({status: "Ok", payload: "El producto no existe dentro del carrito"});
            } else {
                res.send({status: "Ok", payload: result});
            }
        }
    }
})

router.delete('/:cid', async(req, res) => { // Funciona
    const id = req.params.cid;
    let result = await cm.deleteCart(id);
    res.send({status: "Ok", payload: result});
})

export default router;