import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_KEY must be defined');
    }
    try {
        console.log('trying to connect to db...');
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Connected to db');
    } catch (err) {
        console.log(err);
    }

    app.listen(3000, () => {
        console.log('Listening on port 3000!!');
    });
}

start();
