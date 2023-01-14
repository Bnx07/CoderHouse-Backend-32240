import express from 'express';
const router = express.Router();

users = [];

router.get('/', (req, res) => {
    res.render(register);
})

router.post('/', (req, res) => {
    let body = req.body;
    let user = {
        name: body.name,
        mail: body.mail,
        password: body.password
    }
    res.send(user);
})

export default router;