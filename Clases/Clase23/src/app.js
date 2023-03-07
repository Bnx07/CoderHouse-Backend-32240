import express from "express";
import wordRouter from './routes/word.routes.js';
import sessionRouter from './routes/session.routes.js'
import petRouter from './routes/pet.routes.js'

const app = express();
const httpServer = app.listen(8080, () => console.log(`Listening on port 8080`));
// const connection = mongoose.connect('mongodb+srv://Benjamin:Bastan@codercluster.iwgklyq.mongodb.net/?retryWrites=true&w=majority'); // Funciona en test

const routerWord = new wordRouter()
const routerSession = new sessionRouter()

app.use('/word', routerWord.getRouter());
app.use('/user', routerSession.getRouter());