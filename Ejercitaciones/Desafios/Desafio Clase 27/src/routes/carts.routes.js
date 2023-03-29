import { Router } from "express";
import CartController from '../controller/carts.controller.js';

const cc = new CartController();

const router = Router();

router.get('/', cc.get);

router.get('/:cid', cc.getOne);

router.post('/', cc.post);

router.put('/:cid', cc.put);

router.put('/:cid/product/:pid', cc.putProduct);

router.delete('/:cid/product/:pid', cc.deleteProduct);

router.delete('/:cid', cc.delete);

export default router;