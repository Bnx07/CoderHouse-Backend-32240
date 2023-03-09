import {Router} from 'express';
import passport from 'passport';

const router = Router()

router.get('/github', passport.authenticate('github', {scope:['user: email']}), async(req, res) => {});

router.get('/githubcallback', passport.authenticate('github', {failureFlash: '/login'}), async(req, res) => {
    req.session.user = req.user;
    console.log(req.user);
    res.redirect('/');
});

router.post('/login', passport.authenticate('login', {failureRedirect: "/register"}), async(req, res) => {
    req.session.user = req.user;
    console.log(req.user);
    res.redirect('/');
})

router.post('/register', passport.authenticate('register', {failureRedirect: "/register"}), async(req, res) => {
    req.session.user = req.user;
    console.log(req.user);
    res.redirect('/login');
})

export default router;