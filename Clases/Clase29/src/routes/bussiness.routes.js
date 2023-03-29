import { Router } from "express";
import bussinesssController from '../controller/bussiness.js';

const router = Router();
const bc = new bussinesssController();

router.get('/', bc.getBussiness);

router.post('/', bc.createBussiness);

router.get('/:bid', bc.getBussinessById);

router.put('/:bid', bc.putBussiness);

export default router;