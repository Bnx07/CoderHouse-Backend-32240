import {faker} from '@faker-js/faker';
import { tickets as Ticket } from '../dao/factory.js';
import { CartsService as cm, ProductsService as pm } from '../dao/repository/index.js';

const tm = new Ticket();

export default class CartController {
    get = async(req, res) => {
        let carts = await cm.get();

        (!carts)?res.send({status: 404, error: "No info avaliable"}):res.send({status: "Ok", payload: carts});
    }

    getOne = async(req, res) => {
        let cid = req.params.cid;
        let carts = await cm.getOne(cid);
        (!carts)?res.send({status: 404, error: "No info avaliable"}):res.send({status: "Ok", payload: carts});
    }

    post = async(req, res) => {
        let result = await cm.post();
        res.send({status: "Ok", payload: result});
    }

    postPurchase = async(req, res) => {
        let cid = req.params.cid;
        console.log(req.user.user)
        try {
            let cart = await cm.getOne(cid);
            let cartProducts = cart.products;
            let ticketTotal = 0;
            let valid = false;

            cartProducts.forEach(product => {
                if (product.quantity <= product._id.stock) {
                    let currentProduct = product._id;
                    currentProduct.stock -= product.quantity;
                    ticketTotal+=currentProduct.price*product.quantity;
                    pm.put(product._id._id, currentProduct); // Actualiza el producto
                    cartProducts.splice(cartProducts.findIndex(element => element._id._id == currentProduct._id), 1);
                    valid = true;
                }
            });

            if (!valid) return res.send({status: 400, message: "You need to have products you can buy"});

            cart.products = cartProducts;
            cm.put(cart._id, cart);

            let date = new Date(Date.now()).toLocaleString();
            let code = faker.database.mongodbObjectId();
            let user = req.user.user.email;

            tm.post({code, purchaser: user, purchase_datetime: date, amount: ticketTotal});

            res.send({status: "Ok", payload: {code, purchaser: user, purchase_datetime: date, amount: ticketTotal}});
        } catch(e) {
            console.log(e);
            res.send({status: 500, message: "Something went wrong"});
        }
    }

    put = async(req, res) => {
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
            let result = await cm.put(cid, cart);
            res.send(result);
        } catch {
            res.send({status: 404, message: "The cart ID doesnt exist or you are not sending an array"});
        }
    }

    putProduct = async(req, res) => {
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
                let result = await cm.put(cid, cart);
                res.send({status: "Ok", payload: result});
            } else {
                res.send({status: 404, message: "Product doesnt exist in cart"});
            }
        } catch {
            res.send({status: 404, message: "The product or cart doesnt exist"});
        }
    }

    delete = async(req, res) => {
        try {
            const id = req.params.cid;
            let result = await cm.deleteCart(id);
            res.send({status: "Ok", payload: result});
        } catch {
            res.send({status: 404, message: "The cart doesnt exist"});
        }
    }

    deleteProduct = async(req, res) => {
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
                        let result = await cm.put(id, cart);
                        res.send({status: "Ok", payload: result});
                    }
                }
            }
        } catch {
            res.send({status: 404, message: "The product or cart doesnt exist"});
    
        }
    }
}