import { Router } from "express";
import Cart from "../dao/dbManagers/carts.js";
import Product from "../dao/dbManagers/products.js";

// MeterLasFuncionesEnUnTryCatchParaQueNoRevienteTodo

const router = Router();
const cm = new Cart();
const pm = new Product();

router.get('/', async(req, res) => { // Funciona
    let carts = await cm.getAll();

    (!carts)?res.send({status: 404, error: "No info avaliable"}):res.send({status: "Ok", payload: carts});
})

router.get('/:cid', async(req, res) => { // Funciona
    let cid = req.params.cid;
    let carts = await cm.getOne(cid);
    (!carts)?res.send({status: 404, error: "No info avaliable"}):res.send({status: "Ok", payload: carts});
})

router.post('/', async(req, res) => { // Funciona
    let result = await cm.createCart();
    res.send({status: "Ok", payload: result});
})

router.put('/:cid', async(req, res) => { // Funciona con array
    try {
        let cid = req.params.cid;
        let products = req.body;
    
        let cart = await cm.getOne(cid);
        let cartProducts = cart.products;
    
        let ids = [];
        if (cartProducts.length > 0) {
            cartProducts.forEach(product => {
                ids.push(product._id);
            })
        }
        
        products.forEach(async(product) => {
            const search = (element) => element == product._id
    
            let valid = ids.findIndex(search);
        
            if (valid != -1) {
                cartProducts[valid].quantity = product.quantity;
            } else {
                cartProducts.push(product);
            }
        })
    
        cart.products = cartProducts;
        let result = await cm.updateCart(cid, cart);
        res.send(result);
    } catch {
        res.send("The cart ID doesnt exist or you are not sending an array");
    }
    
})

router.put('/:cid/product/:pid', async(req, res) => { // Funciona
    try {
        let cid = req.params.cid;
        let pid = req.params.pid;
        let {quantity} = req.body;
        
        let cart = await cm.getOne(cid);
        let exist = false;
        cart.products.forEach(product => {
            if (product._id == pid) {
                product.quantity = quantity;
                exist = true
            }
        })
        if (exist === true) {
            let result = await cm.updateCart(cid, cart);
            res.send({status: "Ok", payload: result});
        } else {
            res.send({status: 404, payload: "Product doesnt exist in cart"});
        }
    } catch {
        res.send("The product or cart doesnt exist");
    }
    
    // const id = req.params.cid;
    // let productId = req.params.pid;

    // let productExist = await pm.getOne(productId);
    
    // if (!productExist) {
    //     res.send({status: 404, payload: "Product doesnt exist"});
    // } else {
    //     let cart = await cm.getOne(id);

    //     if (!cart) {
    //         res.send({status: 404, payload: "Cart doesnt exist"});
    //     } else {
    //         let productsInCart = cart.products.toObject();
    //         let exists = false;
    //         productsInCart.forEach(element => {
    //             if (element.id == productId) {
    //                 exists = true;
    //                 element.quantity += 1;
    //             }
    //         });
    //         if (exists !== true) {
    //             productsInCart.push({id: productId, quantity: 1});
    //         }
    //         cart.products = productsInCart;
    //         let result = await cm.updateCart(id, cart);
    //         res.send({status: "Ok", payload: result});
    //     }
    // }
})

router.delete('/:cid/product/:pid', async(req, res) => { // Funciona
    try {
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
                let productsInCart = cart.products;
                let idToSearch = (element) => element.id === productId;
                if (idToSearch == -1) {
                    res.send({status: 404, payload: "El producto no existe dentro del carrito"});
                } else {
                    let position = productsInCart.findIndex(idToSearch);
                    productsInCart.splice(position, 1);
                    let result = await cm.updateCart(id, cart);
                    res.send({status: "Ok", payload: result});
                }
            }
        }
    } catch {
        res.send("The product or cart doesnt exist");

    }
})

router.delete('/:cid', async(req, res) => { // Funciona
    try {
        const id = req.params.cid;
        let result = await cm.deleteCart(id);
        res.send({status: "Ok", payload: result});
    } catch {
        res.send("The cart doesnt exist");
    }
    
})

export default router;
