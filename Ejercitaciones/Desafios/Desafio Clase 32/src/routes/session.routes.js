import { Router } from 'express';
import passport from 'passport';

import SessionController from '../controller/session.controller.js';
import { registerUser } from '../middlewares/createUser.js'

import config from '../config/config.js';

const router = Router();
const sc = new SessionController();

router.post('/register', registerUser, sc.postRegister);

router.post('/login', passport.authenticate('login', {session: false}), sc.postLogin)

router.post('/logout', sc.postLogout)

router.get('/current', passport.authenticate('jwt', {session: false}), sc.getCurrent);

export default router;