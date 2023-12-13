import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './src/routes/auth';
import session , { SessionData } from'express-session';


const PORT = 3000;

const app= express();

app.use(express.json());

app.use(
    cors({
        origin: '*',
    })
)


app.use('/auth', authRoutes);

mongoose.connect('mongodb+srv://root:root@cluster0.j19swfd.mongodb.net/?retryWrites=true&w=majority'
).then(()=>{
    console.log('connection done');
    app.listen(PORT);
})


