import { Router } from "express";
import { uploader } from "../utils";

const router = Router();

const users = [];

router.get('/', (req, res) => {
    res.send(users);
})

router.post('/', (req, res) => {
    const user = req.body;
    users.push(user);
    res.send({status: "Ok"});
})

router.post('/', uploader.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send({status: "error", error: "No se pudo guardar la imagen"})
    }
    console.log(req.file);
    let user = req.body;
    user.profile = req.file.path;
    users.push(user);
    res.send({status: "Ok", message: "User created"});
})

export default router;