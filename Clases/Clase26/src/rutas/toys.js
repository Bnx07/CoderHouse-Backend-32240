import { Router } from "express";
import controller from '../controladores/toys.js'

const router = Router();

router.get('/toys', (req, res) => {
    controller.readToys
})

router.post('/toys', (req, res) => {
    controller.createToy
})

export default router;