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

router.put('/:cid', async(req, res) => { // Adaptar para que funcione con arrays y modifique la lista de productos en vez de reemplazarla
    let cid = req.params.cid;
    let products = req.body;
    console.log("Products: ")
    console.log(products);

    let cart = await cm.getOne(cid);
    let cartProducts = cart.products;

    cartProducts.push(products);
    cart.products = cartProducts;
    console.log(cart)
    let result = await cm.updateCart(cid, cart)
    res.send(result)
})

// router.put('/:cid', async(req, res) => { // Rehacer
//     let products = req.body;
//     console.log(products)
//     let cid = req.params.cid;
//     let cart = await cm.getOne(cid);
//     console.log(cart);
//     if (cart == null) return;
//     let cartProducts = cart.products;
//     console.log("Initial products: " + cartProducts);
//     let ids = [];
//     cartProducts.forEach(product => {
//         ids.push(product._id);
//     })
//     // try {
//         // if (products.indexOf('[') != 0) {
//             cartProducts.push(products);
//         // } else {
//         //     products.forEach(product => {
//         //         if (product._id != undefined && product.quantity != undefined) {
//         //             let valid = ids.findIndex(product._id);
//         //             console.log(valid);
//         //             if (valid != -1) {
//         //                 cartProducts.push(product);
//         //                 ids.push(product._id);
//         //                 console.log("Modified products: " + cartProducts);
//         //             }
//         //         }
//         //     })
//         // }
//     // } catch {
//         if (products._id != undefined && products.quantity != undefined) {
//             cartProducts = [products];
//         }
//     // }
//     cart.products = cartProducts;
//     console.log("Cart: " + cart)
//     let result = await cm.updateCart(cid, cart);
//     res.send(result);
// })

router.put('/:cid/product/:pid', async(req, res) => { // Funciona
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
})

router.delete('/:cid', async(req, res) => { // Funciona, falta que traiga los productos con populate
    const id = req.params.cid;
    let result = await cm.deleteCart(id);
    res.send({status: "Ok", payload: result});
})

export default router;