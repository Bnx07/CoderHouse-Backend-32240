import Router from "express";
import User from "../dao/dbManagers/users.js";

const router = Router();

const userManager = new User();

router.get('/', async(req, res) => {
    let users = await userManager.getAll();

    (!users)?res.status(500).send({status: "Error", error: "No info avaliable"}):res.send({status: "Ok", payload:users});
})

router.post('/', async(req, res) => {
    const {first_name, last_name, email, dni, gender, birthday} = req.body;
    let newUser = {
        first_name,
        last_name,
        email,
        dni,
        gender,
        birthday
    }

    const result = await userManager.saveUser(newUser);
    res.send({status: "Ok", payload: result})
})

export default router;