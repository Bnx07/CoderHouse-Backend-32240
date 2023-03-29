import { Router } from "express";
import ordersController from '../controller/orders.js';

const router = Router();
const oc = new ordersController();

router.get('/', oc.getOrders);

router.post('/', oc.createOrder);

router.get('/:oid', oc.getOrderById);

router.put('/:oid', oc.putOrder);

export default router;