import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import authRoutes from './src/routes/auth';
import { Request, Response } from 'express';
import multer from 'multer';
import transcribe from "./ai/text-diar";
import RecordsModel from './src/models/Record';
import RapportsModel from './src/models/Rapport';


const PORT = 5000;

const app= express();

app.use(express.json());

app.use(
    cors({
        origin: '*',
    })
)


app.use('/auth', authRoutes);


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split(".")[1]
        const fileName = `${Date.now()}.${ext}`;
        cb(null, fileName);
    },
  });
  
const upload = multer({ storage });


app.post('/upload', 
    upload.single('file'), 
    (req : Request, res : Response) => {
        transcribe(req.file!.filename)
            .then(
            (r) => {
                const record = new RecordsModel({
                    employee: req.body.agent,
                })
                record.save();
                const report = new RapportsModel({
                    Record: record._id,
                    Messages: r,
                    Summary: 'summary', 
                })
                report.save();
                res.status(200).send(r);
            }
        
        )
        
    }
); 





mongoose.connect('mongodb+srv://chzarhane:P2j6Tz80RmiKNVWM@cluster0.tyhxavy.mongodb.net/?retryWrites=true&w=majority'
).then(()=>{
    console.log('connection done');
    app.listen(PORT);
})


