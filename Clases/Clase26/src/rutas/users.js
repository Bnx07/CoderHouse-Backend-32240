import { Router } from "express";
import controller from '../controladores/users.js'

const router = Router();

router.get('/user', (req, res) => {
    controller.readUsers(req, res)
})

router.post('/user', (req, res) => {
    controller.createUser(req, res)
    // res.send("Done")
})

export default router;