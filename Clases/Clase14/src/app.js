import express from 'express';
import userRouter from './routes/users.routes.js'
import mongoose from 'mongoose';
mongoose.set("strictQuery", false); // Quita el warning

const app = express();
app.use(express.json())
// app.use(express.urlencoded({extended: true}));

const httpServer = app.listen(8080,() => console.log("Server listening on port 8080"));

mongoose.connect('mongodb+srv://Benjamin:Bastan@codercluster.iwgklyq.mongodb.net/?retryWrites=true&w=majority', (error) => {
    if (error) {
        console.log("No se pudo conenctar a la base de datos, " + error);
        process.exit();
    }
})

app.use('/api/users', userRouter);

