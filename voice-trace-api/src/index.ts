import express, {Request , Response} from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import employeeRoutes from './routes/Employee';

const PORT = 5000;

const app= express();

app.use(express.json());

app.use(
    cors({
        origin: '*',
    })
)

app.use('/', employeeRoutes);
mongoose.connect('mongodb+srv://root:root@cluster0.j19swfd.mongodb.net/?retryWrites=true&w=majority'
).then(()=>{
    console.log('connection done');
    app.listen(PORT);
})
