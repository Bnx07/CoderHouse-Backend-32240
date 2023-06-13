import { Router } from 'express';
import passport from 'passport';

import SessionController from '../controller/session.controller.js';
import { registerUser } from '../middlewares/createUser.js';
import { loginUser } from '../middlewares/loginUser.js';
import { recoverUser } from '../middlewares/recoverUser.js';
import { recoverPassword } from '../middlewares/recoverPassword.js'; 
import { userData } from "../middlewares/userData.js";
import { isAdmin } from "../middlewares/isAdmin.js";

import config from '../config/config.js';
import saveDocs from '../utils/multer.js';
import { reviewDocs } from '../utils/multer.js';

const router = Router();
const sc = new SessionController();

router.get('/', sc.getAll);

router.get('/current', passport.authenticate('jwt', {session: false}), sc.getCurrent);

router.post('/register', registerUser, sc.postRegister);

router.post('/login', loginUser, sc.postLogin)

router.post('/logout', sc.postLogout)

router.post('/recover', recoverUser, sc.postRecover);

router.post('/recoverPassword', recoverPassword, sc.postRecoverPassword);

router.post('/premium/:uid', passport.authenticate('jwt', {session: false}), sc.postSwapUserClass);

router.post('/:uid/documents', userData, saveDocs, sc.postDocuments);

router.post('/:uid/reviewDocuments', reviewDocs, sc.postAreDocumentsRepeated);

router.put('/swapRoleForced/:uid', isAdmin, sc.postSwapRoleForced);

router.delete('/', userData, sc.deleteInactive);

router.delete('/:uid', isAdmin, sc.deleteUser);

export default router;