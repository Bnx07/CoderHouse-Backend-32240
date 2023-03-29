import { Router } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import SessionController from '../controller/session.controller.js';

import config from '../config/config.js';

const router = Router();
const sc = new SessionController();

router.post('/register', passport.authenticate('register', {session: false, passReqToCallback: true, failureRedirect: 'failedLogin'}), sc.postRegister)

router.post('/login', passport.authenticate('login', {session: false, failureRedirect: 'failedRegister'}), sc.postLogin)

router.post('/logout', sc.postLogout)

router.get('/current', passport.authenticate('jwt', {session: false}), sc.getCurrent);

router.get('/failedRegister', sc.getFailedRegister)

router.get('/failedLogin', sc.getFailedLogin)

export default router;