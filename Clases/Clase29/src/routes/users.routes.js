import { Router } from "express";
import usersController from '../controller/users.js';

const router = Router();
const uc = new usersController();

router.get('/', uc.getUsers);

router.post('/', uc.createUser);

router.get('/:uid', uc.getUserById);

export default router;