import express from 'express';
import __dirname from './utils.js';
import mongoose from 'mongoose';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import handlebars from 'express-handlebars';

import initPassport from './config/passport.config.js';
import cartRouter from './routes/carts.routes.js';
import productRouter from './routes/products.routes.js';
import viewsRouter from './routes/views.routes.js';
import sessionRouter from './routes/session.routes.js';

import config from './config/config.js';
import { connection } from './dao/factory.js';

mongoose.set("strictQuery", false); // Quita el warning

const app = express();
const port = 8080;                                                                          

// const connection = mongoose.connect(config.connection);

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