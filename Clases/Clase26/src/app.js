import express from 'express';

import operationsRouter from './rutas/operations.js';
import usersRouter from './rutas/users.js';
import toysRouter from './rutas/toys.js'

const app = express();
const port = 8080;
const httpServer = app.listen(port, () => console.log("Listening on port " + port));

app.get('/', (req, res) => {
    res.send("Hi coders");
})

app.use('/operations', operationsRouter);
app.use('/toys', toysRouter);
app.use('/users', usersRouter);