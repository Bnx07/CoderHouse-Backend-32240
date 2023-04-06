import express from 'express';
import usersRouter from './routes/user.routes.js';
import errorHandle from './middlewares/errors/index.js';

const app = express();

const server = app.listen(8080, () => console.log("Server listening on port 8080"));

app.use(express.json());

app.use('/api/users', usersRouter);
app.use(errorHandle)