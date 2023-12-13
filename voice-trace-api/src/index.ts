import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import employeeRoutes from './routes/Employee';
import recordRoutes from './routes/Record';
import RapportRoutes from './routes/Rapport';



const PORT = 3000;
const app = express();

app.use(express.json());

app.use(
    cors({
        origin: '*',
    })
);

app.use('/', employeeRoutes);
app.use('/', recordRoutes);
app.use('/', RapportRoutes);

const mongodbUri = process.env.MONGODB_URI;

if (mongodbUri === undefined) {
    console.error('MONGODB_URI is not set in the environment variables.');
} else {
    mongoose.connect(mongodbUri).then(() => {
        console.log('Connection done');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }).catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
}
