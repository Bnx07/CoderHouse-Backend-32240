import { Router } from 'express';
import passport from 'passport';

import SessionController from '../controller/session.controller.js';
import { registerUser } from '../middlewares/createUser.js';
import { loginUser } from '../middlewares/loginUser.js';
import { recoverUser } from '../middlewares/recoverUser.js';

import config from '../config/config.js';

const router = Router();
const sc = new SessionController();

router.post('/register', registerUser, sc.postRegister);

router.post('/login', loginUser, sc.postLogin)

router.post('/logout', sc.postLogout)

router.post('/recover', recoverUser, sc.postRecover);

router.get('/current', passport.authenticate('jwt', {session: false}), sc.getCurrent);

export default router;