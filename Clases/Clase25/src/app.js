import express from "express";

const app = express();
const httpServer = app.listen(8080, () => console.log(`Listening on port 8080`));
// const connection = mongoose.connect('mongodb+srv://Benjamin:Bastan@codercluster.iwgklyq.mongodb.net/?retryWrites=true&w=majority'); // Funciona en test
