import { Router } from "express";
import ProductController from "../controller/products.controller.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const pc = new ProductController();

const router = Router();

router.get('/', pc.get);

router.get('/mockProducts', pc.getMockProducts);

router.post('/', isAdmin, pc.post);

router.put('/:pid', isAdmin, pc.put);

router.delete('/:pid', isAdmin, pc.delete);

export default router;