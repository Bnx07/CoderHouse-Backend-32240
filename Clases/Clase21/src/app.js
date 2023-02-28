import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import passport from "passport";
import initPassport from "./config/passport.config.js";

import viewsRouter from "./routes/views.routes.js";
import sessionRouter from "./routes/session.routes.js";

const port = process.env.port || 8080;
const app = express();

mongoose.set('strictQuery', false);

const connection = mongoose.connect('mongodb+srv://Benjamin:Bastan@codercluster.iwgklyq.mongodb.net/?retryWrites=true&w=majority'); // Funciona en test

app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://Benjamin:Bastan@codercluster.iwgklyq.mongodb.net/sessions?retryWrites=true&w=majority', // Funcionan en sessions
        mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
        ttl: 20
    }),
    secret: "secretCoder",
    resave: false,
    saveUnitialized: false
}))

initPassport();
app.use(passport.session({
    secret: "S3cretCod3r"
}))

app.use(passport.initialize());

app.engine("handlebars", handlebars.engine());

app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.use('/', viewsRouter);
app.use('/api/session', sessionRouter);

const httpServer = app.listen(port, () => console.log(`Listening on port ${port}`));