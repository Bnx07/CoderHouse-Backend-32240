import {Router} from "express";

const router = Router();

router.get('/', (req, res) => {
    if (!req.user) {
        return res.render('login');
    }
    res.render('home');
})

router.get('/home', (req, res) => {
    res.render('home');
})

router.get('/login', (req, res) => res.render('login'));

router.get('/register', (req, res) => {
    // res.status(503).send("Not found");
    res.render('register');
})

export default router;