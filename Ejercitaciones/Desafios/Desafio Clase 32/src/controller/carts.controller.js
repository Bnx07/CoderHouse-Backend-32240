import {faker} from '@faker-js/faker';
import { tickets as Ticket } from '../dao/factory.js';
import { CartsService as cm, ProductsService as pm } from '../dao/repository/index.js';

import { CustomError, errorCodes, generateErrorInfo } from '../errors.js';

const tm = new Ticket();

export default class CartController {
    get = async(req, res) => {
        try {
            let carts = await cm.get();
            if (!carts) CustomError.createError({cause: generateErrorInfo.getEmptyDatabase(), message: "No info avaliable", code: 3});
            res.send({status: "Ok", payload: carts});
        } catch (error) {
            next(error);
        }
    }

    getOne = async(req, res, next) => {
        try {
            let cid = req.params.cid;
            if (cid.length != 24) CustomError.createError({statusCode: 400, name: "Error leyendo la base de datos", cause: generateErrorInfo.getId(cid), message: "Cart ID not valid", code: 2});
            let carts = await cm.getOne(cid);
            console.log(carts)
            if (!carts) CustomError.createError({name: "Error leyendo la base de datos", cause: generateErrorInfo.getEmptyDatabase(), message: "No info avaliable", code: 3})
                // res.send({status: 404, error: "No info avaliable"})
            res.send({status: "Ok", payload: carts});
        } catch (error) {
            next(error);
        }
    }

    post = async(req, res) => {
        let result = await cm.post();
        res.send({status: "Ok", payload: result});
    }

    postPurchase = async(req, res) => {
        try {
            let cid = req.params.cid;
            
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

            if (!valid) CustomError.createError({statusCode: 400, name: "No products added", cause: generateErrorInfo.getEmptyDatabase(), message: "There was no product that could be purchased", code: 4}) //return res.send({status: 400, message: "You need to have products you can buy"});

            cart.products = cartProducts;
            cm.put(cart._id, cart);

            let date = new Date(Date.now()).toLocaleString();
            let code = faker.database.mongodbObjectId();
            let user = req.user.user.email;

            tm.post({code, purchaser: user, purchase_datetime: date, amount: ticketTotal});

            res.send({status: "Ok", payload: {code, purchaser: user, purchase_datetime: date, amount: ticketTotal}});
        } catch (error) {
            next(error);
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
        } catch (error) {
            next(error);
        }
    }

    putProduct = async(req, res) => {
        try {
            let cid = req.params.cid;
            let pid = req.params.pid;
            let {quantity} = req.body;
            
            let cart = await cm.getOne(cid);
            if (!cart) CustomError.createError({statusCode: 404, name: "Cart doesnt exist", cause: generateErrorInfo.idNotFound(), code: 2});
            let exist = false;
            cart.products.forEach(product => {
                if (product._id == pid) {
                    product.quantity = quantity;
                    exist = true
                }
            })
            if (exist === true) {
                let result = await cm.put(cid, cart);
                return res.send({status: "Ok", payload: result});
            }
            CustomError.createError({statusCode: 404, name: "Product doesnt exist in cart", cause: generateErrorInfo.idNotFound(), code: 2})
        } catch (error) {
            next(error);
        }
    }

    delete = async(req, res) => {
        try {
            const id = req.params.cid;
            let cart = await cm.getOne(cid);
            if (!cart) CustomError.createError({statusCode: 404, name: "Cart doesnt exist", cause: generateErrorInfo.idNotFound(), code: 2});
            let result = await cm.deleteCart(id);
            res.send({status: "Ok", payload: result});
        } catch (error) {
            next(error);
        }
    }

    deleteProduct = async(req, res) => {
        asdf
        try {
            const id = req.params.cid;
            let productId = req.params.pid;
        
            let productExist = await pm.getOne(productId);
            
            if (!productExist) {
                CustomError.createError({statusCode: 404, name: "Product doesnt exist", cause: generateErrorInfo.idNotFound(), code: 2});
            } else {
                let cart = await cm.getOne(id);
        
                if (!cart) {
                    CustomError.createError({statusCode: 404, name: "Cart doesnt exist", cause: generateErrorInfo.idNotFound(), code: 2});
                } else {
                    let productsInCart = cart.products;
                    let idToSearch = (element) => element.id === productId;
                    if (idToSearch == -1) {
                        CustomError.createError({statusCode: 404, name: "Product doesnt exist in cart", cause: generateErrorInfo.idNotFound(), code: 2})
                    } else {
                        let position = productsInCart.findIndex(idToSearch);
                        productsInCart.splice(position, 1);
                        let result = await cm.put(id, cart);
                        res.send({status: "Ok", payload: result});
                    }
                }
            }
        } catch (error) {
            next(error);
        }
    }
}