import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import mongoose from 'mongoose';
import viewsRouter from './routes/views.routes.js';

mongoose.set('strictQuery', false)

const port = 8080;
const app = express();
const connection = mongoose.connect('mongodb+srv://Benjamin:Bastan@codercluster.iwgklyq.mongodb.net/students?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars', handlebars.engine());
app.set("view engine", 'handlebars');
app.set("views", __dirname + '/views');
app.use('/', viewsRouter);

const httpServer = app.listen(port, () => console.log("Server on"))