import { Router } from "express";
import CartManager from "../cartManager.js";

const cm = new CartManager('../');
const router = Router();

router.post('/', async(req, res) => { // FUNCIONA
    let response = await cm.addCart();
    res.send(response)
})

router.get('/:cid', async(req, res) => { // FUNCIONA
    let cartId = req.params.cid;
    cartId = parseInt(cartId);

    if (isNaN(cartId)) {
        res.send({status: 404, message: 'ID has to be a number'});
    } else {
        let response = await cm.getCartById(cartId);
        if (response != false) {
            if (typeof response === 'object') {
                res.send(response.objects);
            } else {
                res.send(response);
            }
        } else {
            res.send({status: 500, message: 'Server cant find the file'});
        }
    }
})

router.post('/:cid/product/:pid', async(req, res) => { // EN TEORIA FUNCIONA
    let cartId = req.params.cid;
    let productId = req.params.pid;
    let response = await cm.addProductToCart(cartId, productId);
    if (response == false) {
        res.send({status: 500, message: 'Server cant find the file'})
    } else {
        res.send(response);
    }
})

export default router;