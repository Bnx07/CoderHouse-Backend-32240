import Router from 'express';
import ProductManager from '../productManager.js';
const pm = new ProductManager ("../")

const router = Router();

router.get('/', async (req, res) => {
    let products = await pm.getProducts() //.then(console.log(products))
    res.render('home', {products})

    // res.render('home');
    
})

router.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts');
})

export default router;