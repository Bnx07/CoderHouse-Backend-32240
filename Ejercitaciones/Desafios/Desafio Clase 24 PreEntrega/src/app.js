import express from 'express';
import __dirname from './utils.js';
import mongoose from 'mongoose';
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from 'passport';
import cookieParser from 'cookie-parser'

import initPassport from './config/passport.config.js';
import cartRouter from './routes/carts.routes.js';
import productRouter from './routes/products.routes.js';
import viewsRouter from './routes/views.routes.js';
import sessionRouter from './routes/session.routes.js';

import handlebars from 'express-handlebars';

mongoose.set("strictQuery", false); // Quita el warning

const app = express();
const port = 8080;                                                                          //     /DataBase?

const connection = mongoose.connect('mongodb+srv://Benjamin:Bastan@codercluster.iwgklyq.mongodb.net/ecommerce?retryWrites=true&w=majority');

app.use(cookieParser());
initPassport();
app.use(passport.initialize());

app.engine('handlebars', handlebars.engine());
app.set("views", __dirname+"/views");
app.set("view engine", 'handlebars');

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/carts', cartRouter);
app.use('/api/products', productRouter);
app.use('/api/session', sessionRouter);
app.use('/', viewsRouter);

const httpServer = app.listen(port, () => console.log(`Server listening on port ${port}`));