import { Router } from "express";

import ViewController from "../controller/views.controller.js";
import { userData } from "../middlewares/userData.js";

const router = Router();
const vc = new ViewController();

router.get('/', userData, vc.get);

router.get('/carts/:cid', userData, vc.getCart);

router.get('/product/:pid', userData, vc.getProduct);

router.get('/register', vc.getRegister);

router.get('/login', vc.getLogin);

router.get('/user', userData, vc.getUser);

router.get('/chat', userData, vc.getChat);

router.get('/recover/', vc.getRecover);

router.get('/recoverLanding/:token', vc.getRecoverLanding);

router.get('*', vc.getAll)

export default router;