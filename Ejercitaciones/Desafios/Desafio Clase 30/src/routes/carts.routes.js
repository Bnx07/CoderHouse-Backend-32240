import { Router } from "express";
import passport from "passport";
import CartController from '../controller/carts.controller.js';
import { isUser } from "../middlewares/isUser.js";

const cc = new CartController();

const router = Router();

router.get('/', cc.get);

router.get('/:cid', cc.getOne);

router.post('/', cc.post);

router.put('/:cid', isUser, cc.put);

router.put('/:cid/product/:pid', isUser, cc.putProduct);

router.delete('/:cid/product/:pid', isUser, cc.deleteProduct);

router.delete('/:cid', cc.delete);

router.post('/:cid/purchase', passport.authenticate('jwt', {session: false}), cc.postPurchase);

export default router;