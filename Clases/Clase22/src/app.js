import express from "express";
import __dirname from "./utils.js";
import passport from "passport";
import cookieParser from 'cookie-parser';
import initPassport from "./config/passport.config.js";
import handlebars from 'express-handlebars';
import mongoose from "mongoose";

import sessionRouter from './routes/session.routes.js';
import viewsRouter from './routes/views.routes.js';

const app = express();
const httpServer = app.listen(8080, () => console.log(`Listening on port 8080`));
const connection = mongoose.connect('mongodb+srv://Benjamin:Bastan@codercluster.iwgklyq.mongodb.net/?retryWrites=true&w=majority'); // Funciona en test

app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.engine("handlebars", handlebars.engine());

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

initPassport();

app.use(passport.initialize());
app.use('/', viewsRouter);
app.use('/api/session', sessionRouter);


app.post('/login', (req, res) => { // El login devuelve el token creado con jwt
    const {email, password} = req.body;
    if (email == "coder@coder.com" && password == "coderpass") {
        let token = jwt.sing({email, password}, 'coderSecret', {expires: "24h"});
        res.send({message: "Logged in succesfully", token: token});
    }
});