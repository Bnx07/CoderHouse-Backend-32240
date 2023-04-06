import express from 'express';
import __dirname from './utils.js';
import mongoose from 'mongoose';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';

import initPassport from './config/passport.config.js';
import cartRouter from './routes/carts.routes.js';
import productRouter from './routes/products.routes.js';
import viewsRouter from './routes/views.routes.js';
import sessionRouter from './routes/session.routes.js';
import ticketRouter from './routes/tickets.routes.js';
import messageRouter from './routes/messages.routes.js'

import config from './config/config.js';
import { connection } from './dao/factory.js';

import Message from './dao/dbManagers/messages.js';

const mm = new Message();

mongoose.set("strictQuery", false); // Quita el warning

const app = express();
const port = 8080;

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
app.use('/api/tickets', ticketRouter);
app.use('/api/chat', messageRouter);
app.use('/', viewsRouter);

const httpServer = app.listen(port, () => console.log(`Server listening on port ${port}`));

export const io = new Server(httpServer);

let messages = await mm.getAll();

io.on('connection', socket => {

    socket.on("message", data => {
        mm.addMessage(data);
        messages.push(data);
        
        io.emit('Messages', messages);
    })

    socket.on('authenticated', data => { // Funciona
        socket.broadcast.emit('newUserConnected', data);
        socket.emit('Messages', messages);
    })
})