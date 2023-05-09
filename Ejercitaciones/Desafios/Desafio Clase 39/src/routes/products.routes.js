import { Router } from "express";
import ProductController from "../controller/products.controller.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { userRole } from "../middlewares/userRole.js";

const pc = new ProductController();

const router = Router();

router.get('/', pc.get);

router.get('/mockProducts', pc.getMockProducts);

router.post('/', userRole, pc.post);

router.put('/:pid', userRole, pc.put);

router.delete('/:pid', userRole, pc.delete);

export default router;