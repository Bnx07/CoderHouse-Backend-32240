import CartManager from "../dao/dbManagers/carts.js";
import Ticket from "../dao/dbManagers/tickets.js";
import Product from "../dao/dbManagers/products.js";
import {faker} from '@faker-js/faker';

const tm = new Ticket();
const cm = new CartManager();
const pm = new Product();

export default class TicketController {
    get = async(req, res) => { // Funciona
        let result = await tm.get();
        res.send({status: "Ok", payload: result});
    }

    getOne = async(req, res) => { // Funciona
        let id = req.params.tid;
        try {
            let result = await tm.getOne(id)
            if (result == null) {
                return res.send({status: 400, message: "There is no ticket with that ID"});
            }
            res.send({status: "Ok", payload: result});
        } catch(e) {
            console.log(e);
            res.send({status: 500, message: "Something went wrong"});
        }
    }

    post = async(req, res) => { // Funciona
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

            res.send({status: "Ok", message: "Hope you like what you bought", payload: `The code of the ticket is ${code} and the total is ${ticketTotal}`});
        } catch(e) {
            console.log(e);
            res.send({status: 500, message: "Something went wrong"});
        }
    }
}