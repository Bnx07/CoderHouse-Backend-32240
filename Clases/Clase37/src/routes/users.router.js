import {Router} from 'express';
import { addUserToCourse, getUsers, createUser } from '../controllers/users.controller.js';

const router = Router();

router.get('/', getUsers);

router.get('/:uid/courses/:cid', addUserToCourse);

router.post('/', createUser);

export default router;