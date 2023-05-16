import express from 'express';
import __dirname from './utils/utils.js';
import mongoose from 'mongoose';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import handlebars from 'express-handlebars';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
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
import errorHandler from './middlewares/errors/index.js';
import { addLogger, logger } from './utils/logger.js';

import { messages as Message } from './dao/factory.js';

const mm = new Message();

mongoose.set("strictQuery", false); // Quita el warning

const app = express();

app.use(cookieParser());
initPassport();
app.use(passport.initialize());
app.use(addLogger);

app.engine('handlebars', handlebars.engine());
app.set("views", __dirname+"/views");
app.set("view engine", 'handlebars');

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: "Documentacion de las API",
            description: "APIs desarrolladas que conforman parte del proyecto"
        }
    },
    apis: [`./src/docs/**.yaml`] // Sin /src si es con nodemon app.js
};

const specs = swaggerJsdoc(swaggerOptions);
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.get('/loggerTest', (req, res) => {
    req.logger.debug("TEST - Debug");
    req.logger.http("TEST - HTTP");
    req.logger.info("TEST - Info");
    req.logger.warning("TEST - Warning");
    req.logger.error("TEST - Error");
    req.logger.fatal("TEST - Fatal");
    res.send({status: "Ok", message: "LoggerTest excecuted successfully"});
})

app.use('/api/carts', cartRouter);
app.use('/api/products', productRouter);
app.use('/api/session', sessionRouter);
app.use('/api/tickets', ticketRouter);
app.use('/api/chat', messageRouter);
app.use('/', viewsRouter);

app.use(errorHandler);

const httpServer = app.listen(config.port || 8080, () => logger.info(`Server listening on port ${config.port || 8080}`));

export const io = new Server(httpServer);

let messages = await mm.getAll();

io.on('connection', socket => {

    socket.on("message", data => {
        if (data.user == '') return;

        if (data.role == user) {
            mm.addMessage(data);
            messages.push(data);
            
            io.emit('Messages', messages);
        }
    })

    socket.on('authenticated', data => {
        socket.broadcast.emit('newUserConnected', data);
        socket.emit('Messages', messages);
    })
})