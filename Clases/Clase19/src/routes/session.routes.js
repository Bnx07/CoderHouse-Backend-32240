import {Router} from 'express';
import userModel from '../dao/models/user.js'

const router = Router()

router.post('/register', async(req, res) => {
    const {first_name, last_name, age, email, password} = req.body;

    if (!first_name || !last_name || !age || !email || !password) res.status(404).send({status: "Error", error: "Some data is missing"});

    const exists = await userModel.findOne({email});

    if (exists) return res.status(404).send({status: "Error", error: "The email is already used"});

    const result = await userModel.create({
        first_name,
        last_name,
        email,
        age,
        password
    })

    res.status(200).send({status: "Ok", message: result});
})

router.post('/login', async(req, res) => {
    const {email, password} = req.body;

    if (!email || !password) res.status(404).send({status: "Error", error: "Some data is missing"});

    const user = await userModel.findOne({email, password});

    if (!user) return res.status(404).send({status: "Error", error: "Email or password invalid"});

    req.session.user = {
        id: user._id,
        email: user.email
    }

    res.status(200).send({status: "Ok", message: "Logged in"})
})

export default router;