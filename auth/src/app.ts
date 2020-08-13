import express from 'express';
import  'express-async-errors';
import { json } from 'body-parser';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { errorHandler, NotFoundError } from '@jagra_task_manager/common';

const app = express();
app.use(json());
app.use(signinRouter);
app.use(signupRouter);

app.all('*', async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };