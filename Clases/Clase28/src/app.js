import express from "express";
import mongoose from "mongoose";

import contactsRouter from './routes/contacts.routes.js';

const app = express();
const connection = mongoose.connect('mongodb+srv://Benjamin:Bastan@codercluster.iwgklyq.mongodb.net/?retryWrites=true&w=majority');

app.use('/contacts', contactsRouter);

app.listen(8080, () => console.log("Listening on port 8080"));