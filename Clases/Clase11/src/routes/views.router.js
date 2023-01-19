import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home'); // Llega hasta el console.log pero no hace esto
})

export default router;