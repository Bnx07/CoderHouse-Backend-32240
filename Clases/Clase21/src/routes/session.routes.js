import {Router} from 'express';
import userModel from '../dao/models/user.js'
import { createHash, isValidPassword } from '../utils.js';
import passport from 'passport';

const router = Router()

router.get('/github', passport.authenticate('github', {scope:['user: email']}), async(req, res) => {});

router.get('/githubcallback', passport.authenticate('github', {failureFlash: '/login'}), async(req, res) => {
    req.session.user = req.user;
    res.redirect('/')
});

export default router;