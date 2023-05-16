import { tickets as Ticket } from '../dao/factory.js';
import { CartsService as cm, ProductsService as pm } from '../dao/repository/index.js';
import { CustomError, errorCodes, generateErrorInfo } from '../utils/errors.js';

import {faker} from '@faker-js/faker';

const tm = new Ticket();

export default class TicketController {
    get = async(req, res, next) => { // Funciona
        req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);

        try {
            let result = await tm.get();
            if (!result) {
                CustomError.createError({name: "No info avaliable", cause: generateErrorInfo.getEmptyDatabase(), code: 3});
                req.logger.warning('La base de datos de tickets está vacía');
            }

            res.send({status: "Ok", payload: result});
        } catch(error) {
            next(error)
        }
    }

    getOne = async(req, res, next) => { // Funciona
        req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);

        try {
            let id = req.params.tid;
            let result = await tm.getOne(id)
            if (result == null) {
                CustomError.createError({statusCode: 404, name: "There is no ticket with that ID", cause: generateErrorInfo.idNotFound(), code: 2});
                req.logger.error(`El ticket ID no es válido: ${id} en ${req.url}`);
            }
            
            res.send({status: "Ok", payload: result});
        } catch (error) {
            next(error);
        }
    }

    post = async(req, res, next) => { // Funciona
        req.logger.http(`${req.method} at ${req.url} - ${new Date().toLocaleDateString()}`);

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

            if (!valid) {
                CustomError.createError({statusCode: 400, name: "There are no products to buy", cause: generateErrorInfo.getEmptyDatabase(), code: 4});
                req.logger.error(`No hay productos para comprar en el cart ${cid}. Ruta ${req.url}`);
            }

            cart.products = cartProducts;
            cm.put(cart._id, cart);

            let date = new Date(Date.now()).toLocaleString();
            let code = faker.database.mongodbObjectId();
            let user = req.user.user.email;

            tm.post({code, purchaser: user, purchase_datetime: date, amount: ticketTotal});

            res.send({status: "Ok", message: "Hope you like what you bought", payload: `The code of the ticket is ${code} and the total is ${ticketTotal}`});
        } catch(error) {
            next(error);
        }
    }
}