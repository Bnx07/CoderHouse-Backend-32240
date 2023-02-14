import express from 'express';
import __dirname from './utils.js';
import mongoose from 'mongoose';
import { Server } from 'socket.io';

import cartRouter from './routes/carts.routes.js';
import productRouter from './routes/products.routes.js';
import viewsRouter from './routes/views.routes.js';
import messageRouter from './routes/messages.routes.js';

import handlebars from 'express-handlebars';

import Message from './dao/dbManagers/messages.js';
import Product from './dao/dbManagers/products.js';
const mm = new Message();
const pm = new Product();

mongoose.set("strictQuery", false); // Quita el warning

const app = express();
const port = 8080;

const connection = mongoose.connect('mongodb+srv://Benjamin:Bastan@codercluster.iwgklyq.mongodb.net/ecommerce?retryWrites=true&w=majority');
                                                                                            //     /DataBase?
app.engine('handlebars', handlebars.engine());
app.set("views", __dirname+"/views");
app.set("view engine", 'handlebars');
app.use('/', viewsRouter);

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/carts', cartRouter);
app.use('/api/products', productRouter);
app.use('/api/messages', messageRouter);

const httpServer = app.listen(port, () => console.log(`Server listening on port ${port}`));
export const io = new Server(httpServer);

let messages = await mm.getAll();
let products = await pm.getAll();

io.on('connection', socket => {
    console.log("Se inicio la comunicacion");

    socket.on('products', data => { // Funciona
        io.emit(data); // Cuando alguien se conecta, se manda todo
    })

    socket.on("message", data => { // Funciona (Medio raro igual, de la nada funciona)
        mm.addMessage(data);
        messages.push(data);
        
        io.emit('Messages', messages);
    })

    socket.on('authenticated', data => { // Funciona
        socket.broadcast.emit('newUserConnected', data);
        socket.emit('Messages', messages);
    })

    socket.emit('products', products);
    
    socket.on('products', data => { // Funciona
        products.push(data);
        io.emit('products', products);
    })
})