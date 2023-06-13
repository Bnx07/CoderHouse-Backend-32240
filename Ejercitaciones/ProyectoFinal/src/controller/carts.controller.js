import {faker} from '@faker-js/faker';
import { tickets as Ticket } from '../dao/factory.js';
import { CartsService as cm, ProductsService as pm } from '../dao/repository/index.js';

import { CustomError, errorCodes, generateErrorInfo } from '../utils/errors.js';

const tm = new Ticket();

export default class CartController {
    get = async(req, res) => {
        req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);

        try {
            let carts = await cm.get();
            if (!carts) {
                CustomError.createError({cause: generateErrorInfo.getEmptyDatabase(), message: "No info avaliable", code: 3});
                req.logger.warning('La base de datos de carts está vacía');
            }
            res.send({status: "Ok", payload: carts});
        } catch (error) {
            next(error);
        }
    }

    getOne = async(req, res, next) => {
        req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);

        try {
            let cid = req.params.cid;
            if (cid.length != 24) {
                CustomError.createError({statusCode: 400, name: "Error leyendo la base de datos", cause: generateErrorInfo.getId(cid), message: "Cart ID not valid", code: 2});
                req.logger.error(`El Cart ID proporcionado es invalido: ${cid} en la ruta ${req.url}`);
            }
            let carts = await cm.getOne(cid);
            if (!carts) {
                CustomError.createError({name: "Error leyendo la base de datos", cause: generateErrorInfo.getEmptyDatabase(), message: "No info avaliable", code: 3})
                req.logger.warning(`La base de datos de carts está vacía. Ruta: ${req.url}`);
            }
            res.send({status: "Ok", payload: carts});
        } catch (error) {
            next(error);
        }
    }

    post = async(req, res) => {
        req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);

        let result = await cm.post();
        res.send({status: "Ok", payload: result});
    }

    put = async(req, res, next) => { // Añade un producto
        req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);

        req.logger.debug("Llegue al put");

        try {
            let cid = req.params.cid;
            if (req.user.user.cart[0] != cid) return res.status(401).send({status: "error", message: "El carrito no pertenece al usuario"})
            let products = req.body;
        
            let cart = await cm.getOne(cid);

            let cartProducts = cart.products;
            let ids = [];
            if (cartProducts.length > 0) {
                cartProducts.forEach(product => {
                    ids.push(product._id);
                })
            }
            
            let isInvalid = false;

            for (const product of products) {
                const search = (element) => element._id == product._id;
            
                let valid = ids.findIndex(search);
            
                if (valid != -1) {
                    cartProducts[valid].quantity = product.quantity;
                } else {
                    let fullProduct = await pm.getOne({_id: product._id});
                    if (fullProduct.owner == req.user.user.email) {
                        isInvalid = true;
                        break;
                    }
                    cartProducts.push(product);
                }
            }

            if (isInvalid) return res.send({status: "error", message: "You cant add your products to your own cart"});
        
            cart.products = cartProducts;
            
            let result = await cm.put(cid, cart);
            
            if (result.acknowledged) return res.send({status: 'Ok', message: "Se ha guardado el producto"});
            res.send({status: "error", message: "Algo ha salido mal"});
        } catch (error) {
            next(error);
        }
    }

    putProduct = async(req, res) => {
        req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);

        try {
            let cid = req.params.cid;
            let pid = req.params.pid;
            let {quantity} = req.body;
            
            let cart = await cm.getOne(cid);
            if (!cart) {
                CustomError.createError({statusCode: 404, name: "Cart doesnt exist", cause: generateErrorInfo.idNotFound(), code: 2});
                req.logger.error(`El cart ID no es válido: ${cid} en ${req.url}`);
            }
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
            req.logger.error(`El producto ${pid} no existe en ${cid}. Ruta ${req.url}`);
        } catch (error) {
            next(error);
        }
    }

    delete = async(req, res) => {
        req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);

        try {
            const id = req.params.cid;
            let cart = await cm.getOne(cid);
            if (!cart) {
                CustomError.createError({statusCode: 404, name: "Cart doesnt exist", cause: generateErrorInfo.idNotFound(), code: 2});
                req.logger.error(`El cart ID no es válido: ${cid} en ${req.url}`);

            }
            let result = await cm.deleteCart(id);
            res.send({status: "Ok", payload: result});
        } catch (error) {
            next(error);
        }
    }

    deleteProduct = async(req, res) => {
        req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);

        try {
            const id = req.params.cid;
            let productId = req.params.pid;
        
            let productExist = await pm.getOne(productId);
            
            if (!productExist) {
                req.logger.error(`El product ID no es válido: ${productId} en el cart ${id}. Ruta ${req.url}`);
                CustomError.createError({statusCode: 404, name: "Product doesnt exist", cause: generateErrorInfo.idNotFound(), code: 2});
            } else {
                let cart = await cm.getOne(id);
        
                if (!cart) {
                    req.logger.error(`El cart ID no es válido: ${id} en ${req.url}`);
                    CustomError.createError({statusCode: 404, name: "Cart doesnt exist", cause: generateErrorInfo.idNotFound(), code: 2});
                } else {
                    let productsInCart = cart.products;
                    let idToSearch = (element) => element.id === productId;
                    if (idToSearch == -1) {
                        req.logger.error(`El product ID no es válido: ${productId} en el cart ${id}. Ruta ${req.url}`);
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