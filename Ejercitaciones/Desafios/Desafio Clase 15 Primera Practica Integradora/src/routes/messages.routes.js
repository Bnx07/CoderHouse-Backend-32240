import Router from 'express';
import Message from '../dao/dbManagers/messages.js';

const router = new Router();
const mm = new Message();

router.get('/', (req, res) => { // Funciona
    let result = mm.getAll();
    res.send({status: 'Ok', payload: result});
})

router.post('/', async(req, res) => { // Funciona
    let {user, message} = req.body;
    let fullMessage = {
        user,
        message
    }
    let result = await mm.addMessage(fullMessage);
    res.send({status: 'Ok', payload: result});
})

export default router;