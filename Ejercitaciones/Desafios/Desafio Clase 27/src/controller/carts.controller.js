import CartManager from "../dao/dbManagers/carts.js";
import Product from "../dao/dbManagers/products.js";

const cm = new CartManager();
const pm = new Product();

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
            res.send("The cart ID doesnt exist or you are not sending an array");
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
                res.send({status: 404, payload: "Product doesnt exist in cart"});
            }
        } catch {
            res.send("The product or cart doesnt exist");
        }
    }

    delete = async(req, res) => {
        try {
            const id = req.params.cid;
            let result = await cm.deleteCart(id);
            res.send({status: "Ok", payload: result});
        } catch {
            res.send("The cart doesnt exist");
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
            res.send("The product or cart doesnt exist");
    
        }
    }
}