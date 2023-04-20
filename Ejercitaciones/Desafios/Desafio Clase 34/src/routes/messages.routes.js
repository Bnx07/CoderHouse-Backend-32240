import Router from 'express';
import Messages from '../controller/messages.controller.js';
import { isUser } from "../middlewares/isUser.js";

const router = new Router();
const mc = new Messages();

router.get('/', mc.get);

router.post('/', isUser, mc.post);

export default router;