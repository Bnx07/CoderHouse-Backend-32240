import { Router } from "express";
import ProductController from "../controller/products.controller.js";

const pc = new ProductController();

const router = Router();

router.get('/', pc.get)

router.post('/', pc.post)

router.put('/:pid', pc.put)

router.delete('/:pid', pc.delete)

export default router;