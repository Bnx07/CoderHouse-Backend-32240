import express from 'express';
import { addLogger } from './utils/logger.js';

const app = express();

app.use(addLogger);

app.get('/', (req, res) => {
    req.logger.warning('ALERTA, ENTRARON A HOME, AUMENTEN LA SEGURIDAD');
    res.send("Probando nuestro nuevo logger");
})

app.get('/operacionEzPz', (req, res) => {
    let sum = 0;
    for (var i = 0; i < 1000000; i ++) {
        sum += i;
    }
    res.send(sum);
})

app.get('/operacionHard', (req, res) => {
    let sum = 0;
    for (let i = 0; i < 5e8; i ++) {
        sum += i;
    }
})

app.listen(8080, () => console.log("Listening on port 8080"));