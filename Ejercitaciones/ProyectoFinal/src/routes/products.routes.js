import { Router } from "express";
import ProductController from "../controller/products.controller.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { userRole } from "../middlewares/userRole.js";
import saveDocs from '../utils/multer.js';

const pc = new ProductController();

const router = Router();

router.get('/', pc.get);

router.get('/mockProducts', pc.getMockProducts);

router.post('/', userRole, pc.post);

router.post('/fullProduct', userRole, saveDocs, pc.postFullProduct);

router.put('/:pid', userRole, pc.put);

router.delete('/:pid', userRole, pc.delete);

export default router;