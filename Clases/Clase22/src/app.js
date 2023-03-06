import express from "express";
import __dirname from "./utils.js";
import passport from "passport";
import initPassport from "./config/passport.config.js";
import cookieParser from 'cookie-parser';
import handlebars from 'express-handlebars';
import { passportStrategy } from "./utils.js";

import sessionRouter from './routes/session.routes.js';
import viewsRouter from './routes/views.routes.js';

const app = express();
const httpServer = app.listen(8080, () => console.log(`Listening on port 8080`));
// const connection = mongoose.connect('mongodb+srv://Benjamin:Bastan@codercluster.iwgklyq.mongodb.net/?retryWrites=true&w=majority'); // Funciona en test

app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.engine("handlebars", handlebars.engine());

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

initPassport();
app.use(passport.initialize());

app.use('/', viewsRouter);
app.use('/api/session', sessionRouter);

app.get('/current', passportStrategy('jwt'), (req, res) => {
    res.send(req.user);
})

// TIEMPO 1:30 MIN, UNAUTHORIZED