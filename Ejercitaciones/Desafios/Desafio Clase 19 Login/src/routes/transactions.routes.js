import Router from 'express';
import transactionManager from '../dao/fileManagers/transactionManager.js';

const router = Router();
// const tm = new transactionManager();

router.get('/', (req, res) => {

})

router.post('/', (req, res) => {
    const products = req.body;
})

router.get('/:tid', (req, res) => {

})

router.get('/', (req, res) => {

})

export default router;