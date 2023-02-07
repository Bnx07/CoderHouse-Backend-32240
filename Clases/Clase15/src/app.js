import express from 'express';
import __dirname from './utils.js';
import mongoose from 'mongoose';

import userRouter from './routes/users.router.js';
import courseRouter from './routes/courses.router.js';
import viewsRouter from './routes/views.router.js';

import handlebars from 'express-handlebars';

// import othersRouter

mongoose.set("strictQuery", false); // Quita el warning

const app = express();
const port = 8080;

const connection = mongoose.connect('mongodb+srv://Benjamin:Bastan@codercluster.iwgklyq.mongodb.net/?retryWrites=true&w=majority');

app.engine('handlebars', handlebars.engine());
app.set("views", __dirname, "/views");
app.set("view engine", 'handlebars');
app.use('/', viewsRouter);

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/users', userRouter);
app.use('/api/courses', courseRouter);


const httpServer = app.listen(port,() => console.log(`Server listening on port ${port}`));