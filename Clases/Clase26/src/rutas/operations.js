import { Router } from "express";
import controlador from '../controladores/operations.js'

const router = Router();

router.get('/suma', (req, res) => {
    controlador.suma
})

router.get('/list', (req, res) => {
    controlador.list
})

export default router;