import express from 'express';

import userRouter from './routes/users.routes.js';

const app = express();

app.use('/api/users', userRouter);

app.listen(8080, () => console.log("Listening on port 8080"));