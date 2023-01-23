import Router from 'express';
import ProductManager from '../productManager.js';
const pm = new ProductManager ("../")

const router = Router();

router.get('/', async (req, res) => {
    let products = await pm.getProducts();
    res.render('home', {products});
})

router.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts');
})

export default router;