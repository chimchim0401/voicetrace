import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from 'body-parser';
import authRoutes from './routes/auth';
import session , { SessionData } from'express-session';
import * as crypto from 'crypto';

const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3001',
}));

const secretKey = crypto.randomBytes(32).toString('hex');


// Middleware pour gérer les sessions
app.use(
  session({
    name: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 24 * 1000, // 24 heures en millisecondes
    },
  })
);


// Routes
app.use('/auth', authRoutes);

//la base de données MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/aiProjet")
  .then(() => {
    console.log('Connecté à MongoDB');
  })
  .catch((error) => {
    console.error('Erreur de connexion à MongoDB', error);
  });

app.listen(3000, () => {
  console.log(`Serveur en cours d'exécution sur le port 3000`);
});
