import { Router } from 'express';
import userManager from "../dao/dbManagers/users.js";

const router = Router();
const um = new userManager();

router.post('/register', async(req, res) => {
    console.log("Entre");
    const {first_name, last_name, age, email, password} = req.body;

    if (!first_name || !last_name || !age || !email || !password) return res.send({status: "Error", error: "Some data is missing"});

    const exists = await um.findUser({email});
    console.log(exists)

    if (exists != null) return res.send({status: "Error", error: "The email is already used"});

    const result = await um.addUser({
        first_name,
        last_name,
        email,
        age,
        password
    })

    return res.status(200).send({status: "Ok", message: result});
})

router.post('/login', async(req, res) => {
    const {email, password} = req.body;

    if (!email || !password) res.send({status: "Error", error: "Some data is missing"});

    const user = await um.findUser({email, password});

    if (!user) return res.send({status: "Error", error: "Email or password invalid"});

    if (user.email == "adminCoder@coder.com") {
        req.session.user = {
            id: user._id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            password: user.password,
            role: 'admin'
        }
    } else {
        req.session.user = {
            id: user._id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            password: user.password,
            role: 'user'
        }
    }

    res.status(200).send({status: "Ok", message: "Logged in"})
})

router.post('/logout', async(req, res) => {
    req.session.destroy((error) => {
        if (!error) {
            res.clearCookie("connect.sid")
            return res.send({status: "Ok", message: "Logged out"});
        } else {
            res.send({status: 500, error: "An error has ocurred while logging out"});
        }
    })
})

export default router;