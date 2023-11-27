import express, { Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/UserSchema';
import EmployeeModel from '../models/EmployeeModel';
import { generateResetCode, sendResetCodeByEmail } from './configEmailSend';
import CustomSession from '../customSession';


export const login = async (req: Request, res: Response) => {                                                                                                                                                                                                                                         
    try {
      const { email, password }: { email: string; password: string } = req.body;
      console.log(email, password);
  
      
     // const result1 = await UserModel.create({email: "douniaaissi220@gmail.com" , password: "$2b$10$Y4AY4iQcqsxcEnJeu2uYPOiapinP2j.WTVxZoVRKBCKZ.VWkp32WC" , firstname: "dounia" , lastname: "aissi" ,role: "ADMIN"})
      //const result2 = await EmployeeModel.create({email: "douniaaissi220@gmail.com" , password: "$2b$10$Y4AY4iQcqsxcEnJeu2uYPOiapinP2j.WTVxZoVRKBCKZ.VWkp32WC" , firstname: "dounia" , lastname: "aissi" ,role: "ADMIN"})
      const user = await UserModel.findOne({ email });
      console.log(user);
      if (!user) {
        return res.status(401).json({ message: 'Nom ou mot de passe incorrect.' });
      }
  
      // Vérifiez le mot de passe
      const passwordMatch: boolean = await bcrypt.compare(password, user.password);
      console.log(passwordMatch);
      if (!passwordMatch) {
        return res.status(402).json({ message: 'Nom ou mot de passe incorrect.' });
      }
  
      (req.session as CustomSession).email = email;
  
      console.log((req.session as CustomSession).email);
      console.log('lkjhtfdresdfghjklmù')
      // Créez un jeton JWT
      const token: string = jwt.sign({ userId: user._id }, 'votre_secret', { expiresIn: '1h' });
  
      res.status(200).json({ token, id: user._id, role: user.role });
    } catch (error) {
      res.status(500).json({ message: 'Une erreur est survenue lors de la connexion.' });
    }
}



export const verifyEmail = async (req: Request, res: Response) => {
    try {
  
      const { email }: { email: string } = req.body;
      console.log(email);
  
      const user = await UserModel.findOne({ email });
      console.log(user);
      if (!user) {
        return res.status(401).json({ message: 'Email n existe pas' });
      }
      const resetCode = generateResetCode(email);
      console.log(resetCode);
      sendResetCodeByEmail(email, resetCode);
      res.status(200).json({ code: resetCode });
    } catch (error) {
      res.status(500).json({ message: 'Une erreur est survenue lors de la connexion' });
    }
  } 

export const changePass = async (req: Request, res: Response) => {
    try {
      const { email, password, confPassword }: { email: string, password: string, confPassword: string } = req.body;
      console.log(email);
  
      const user = await UserModel.findOne({ email });
      console.log(user);
      if (!user) {
        return res.status(401).json({ message: 'Email n existe pas' });
      }
  
      const passCrypt: string = await bcrypt.hash(password , 10);
      console.log(passCrypt);
      const result = await UserModel.updateOne({ email: email }, { $set: { password: passCrypt } });
      console.log(result);
      if (result.modifiedCount === 1) {
        console.log('La mise à jour a été effectuée avec succès.');
      } else {
        console.log('erreur');
      }
  
      res.status(200).json({ message: 'mot de passe modifié' });
    } catch (error) {
      res.status(500).json({ message: 'Une erreur est survenue lors de la connexion' });
    }
  }


  export const checkLogin = (req: Request, res: Response) => {
    console.log(req.session);
    console.log((req.session as CustomSession).email)
    if ((req.session as CustomSession).email) {
      console.log((req.session as CustomSession).email)
      res.status(200).json({ isLoggedIn: true, email: (req.session as CustomSession).email });
  
    } else {
      res.status(200).json({ isLoggedIn: false });
    }
  }