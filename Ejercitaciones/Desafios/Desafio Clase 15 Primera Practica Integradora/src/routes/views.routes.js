import { Router } from "express";
import Product from "../dao/dbManagers/products.js";
const pm = new Product();

const router = Router();

router.get('/', async (req, res) => { // Funciona
    let products = await pm.getAll();
    res.render('home', {products});
})

router.get('/realTimeProducts', (req, res) => { // Funciona
    res.render('realTimeProducts');
})

router.get('/chat', (req, res) => { // Funciona
    res.render('chat');
})

export default router;