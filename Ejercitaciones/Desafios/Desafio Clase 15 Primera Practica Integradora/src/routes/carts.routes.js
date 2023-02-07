import { Router } from "express";
import Cart from "../dao/dbManagers/carts.js";

const router = Router();
const cm = new Cart();

router.get('/', async(req, res) => {
    let carts = cm.getAll();

    (!carts)?res.status(500).send({status: "Error", error: "No info avaliable"}):res.send({status: "Ok", payload:carts});
})

router.post('/', async(req, res) => {
    let result = cm.createCart();
    res.send({status: "Ok", payload: result});
})

router.put('/:cid/product/:pid', async(req, res) => {
    const id = req.params.cid;
    let productId = req.params.pid;
    let result = await cm.addProductToCart(id, productId); // EL METODO NO EXISTE
    if (result == false) {
        res.send({status: 500, payload: 'Server cant find the file'});
    } else {
        res.send({status: "Ok", payload: result});
    }
})

router.delete('/:cid/product/:pid', async(req, res) => {
    const id = req.params.cid;
    let productId = req.params.pid;
    let result = await cm.removeProductToCart(id, productId); // EL METODO NO EXISTE
    if (result == false) {
        res.send({status: 500, payload: 'Server cant find the file'});
    } else {
        res.send({status: "Ok", payload: result});
    }
})

router.delete('/:cid', async(req, res) => {
    const id = req.params.cid;
    let result = await cm.deleteCart(id);
    res.send({status: "Ok", payload: result});
})

export default router;