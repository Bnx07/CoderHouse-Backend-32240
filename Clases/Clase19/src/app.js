import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import FileStore from "session-file-store";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";

import viewsRouter from "./routes/views.routes.js";
import sessionRouter from "./routes/session.routes.js";

const port = process.env.port || 8080;
const app = express();

const connection = mongoose.connect('mongodb+srv://Benjamin:Bastan@codercluster.iwgklyq.mongodb.net/?retryWrites=true&w=majority');

// app.use(cookieParser());

// const FileStorage = FileStore(session);

// app.use(session({
//     // ttl
//     // retries
//     // path
//     // store: new FileStorage({path: './sessions', ttl: 100, retries: 0}),
//     store: MongoStore.create({
//         mongoUrl: 'mongodb+srv://Benjamin:Bastan@codercluster.iwgklyq.mongodb.net/sessions?retryWrites=true&w=majority',
//         mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
//         ttl: 15
//     }),
//     secret: "secretCoder",
//     resave: false,
//     saveUnitialized: false
// }))

// app.get('/session',(req,res)=>{
//     if(req.session.counter){
//         req.session.counter++;
//         res.send(`Sitio visitado ${req.session.counter} veces`);
//     }else{
//         req.session.counter=1;
//         res.send('Welcome');
//     }
// })

// app.get('/login', (req, res) => {
//     if(req.session.counter){
//         req.session.counter++;
//         res.send(`Sitio visitado ${req.session.counter} veces`);
//     }else{
//         req.session.counter=1;
//         res.send('Welcome');
//     }
// })

app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://Benjamin:Bastan@codercluster.iwgklyq.mongodb.net/sessions?retryWrites=true&w=majority',
        mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
        ttl: 20
    }),
    secret: "secretCoder",
    resave: false,
    saveUnitialized: false
}))

app.engine("handlebars", handlebars.engine());

app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.use('/', viewsRouter);
app.use('/api/session', sessionRouter);

const httpServer = app.listen(port, () => console.log(`Listening on port ${port}`));