import  express  from "express";
import __dirname from "./utils.js";
import usersRouter from './routes/users.router.js'
import courseRouter from './routes/courses.router.js'
import viewRouter from './routes/views.router.js'
import sessionRouter from './routes/session.routes.js'
import handlebars from 'express-handlebars';
import mongoose from "mongoose";

const app =express();
const PORT =8080;

const connection = mongoose.connect('mongodb+srv://CoderUser:A123456*@pruebacoder.rpvqwdz.mongodb.net/?retryWrites=true&w=majority')

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set('view engine', 'handlebars');
app.use('/',viewRouter);

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/users', usersRouter);
app.use('/api/courses', courseRouter);
app.use('/api/sessions', sessionRouter);

const server =app.listen(PORT,()=>console.log(`Server arriba: ${PORT}`));



