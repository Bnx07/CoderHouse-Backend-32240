import { Router } from "express";
import TicketController from "../controller/tickets.controller.js";
import passport from "passport";

const router = Router();
const tm = new TicketController();

router.get('/', tm.get);

router.get('/:tid', tm.getOne);

router.post('/:cid', passport.authenticate('jwt', {session: false}), tm.post);

export default router;