import express from "express";
import mongoose from "mongoose";

import usersRouter from './routes/users.routes.js';
import bussinessRouter from './routes/bussiness.routes.js';
import ordersRouter from './routes/orders.routes.js';

const app = express();
const connection = mongoose.connect('mongodb+srv://CoderUser:A123456*@pruebacoder.rpvqwdz.mongodb.net/?retryWrites=true&w=majority');

app.use('/api/users', usersRouter);
app.use('/api/bussiness', bussinessRouter);
app.use('/api/orders', ordersRouter);

app.listen(8080, () => console.log("Listening on port 8080"));