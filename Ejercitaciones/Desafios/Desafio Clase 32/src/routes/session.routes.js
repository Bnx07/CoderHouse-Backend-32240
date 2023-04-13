import { Router } from 'express';
import passport from 'passport';

import SessionController from '../controller/session.controller.js';

import config from '../config/config.js';

const router = Router();
const sc = new SessionController();

router.post('/register', passport.authenticate('register', {session: false, passReqToCallback: true}), sc.postRegister)

router.post('/login', passport.authenticate('login', {session: false}), sc.postLogin)

router.post('/logout', sc.postLogout)

router.get('/current', passport.authenticate('jwt', {session: false}), sc.getCurrent);

export default router;