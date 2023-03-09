import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import passport from "passport";

import __dirname from "./utils.js";
import initPassport from "./config/passport.config.js";

import viewsRouter from "./routes/views.routes.js";
import sessionRouter from "./routes/session.routes.js";
import cartRouter from "./routes/carts.routes.js";
import productRouter from "./routes/products.routes.js";

const port = process.env.port || 8080;
const app = express();

mongoose.set('strictQuery', false);

const connection = mongoose.connect('mongodb+srv://Benjamin:Bastan@codercluster.iwgklyq.mongodb.net/ecommerce?retryWrites=true&w=majority'); // Funciona en test.users

app.use(passport.initialize());

initPassport();

app.engine("handlebars", handlebars.engine());

app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.use('/', viewsRouter);
app.use('/api/session', sessionRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

const httpServer = app.listen(port, () => console.log(`Listening on port ${port}`));