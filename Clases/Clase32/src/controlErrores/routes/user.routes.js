import { Router } from "express";

import customError from "../errores.js";
import EError from "../enum.js";
import { generateUserErrorInfo } from "../info.js";

const users = [];

const router = Router();

router.get('/', (req, res) => {
    res.send({status: "Ok", payload: users});
})

router.post('/', (req, res) => {
    const {first_name, last_name, email} = req.body;
    if (!first_name || !last_name || !email) {
        customError.createError({
            name: "Error en la creación del usuario",
            cause: generateUserErrorInfo({first_name, last_name, email}),
            message: "Falló en el intento de crear el usuario",
            code: EError.INVALID_TYPES_ERROR
        })
    }

    const user = {first_name, last_name, email};

    if (users.length == 0) {
        user.id = 1;
    } else {
        user.id = users[users.length-1].id + 1;
    }

    users.push(user);
    res.send({status: "Ok", payload: user, message: "Usuario creado correctamente"});
})

export default router;