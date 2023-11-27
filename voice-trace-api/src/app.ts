import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import UserModel from './User';

import cors from 'cors';

const app = express(); 
app.use(cors());
app.listen(3000, () => {
    console.log("j'écoute sur le port 3000");
});


mongoose.connect("mongodb+srv://rimmazz:PASsw@cluster0.gmr2pwc.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        console.log(" j'arrive à bien établir une connexion et à me lier avec le serveur de base de données.");
    })
    .catch((error: Error) => {
        console.error(" je n'arrive pas à me lier avec le serveur de base de données", error);
    });




app.post("/createUser/:role/:firstname/:lastname/:email/:password", async (req: Request, res: Response) => {
    try {
        const newUser = new UserModel({
            firstname: req.params.firstname,
            lastname: req.params.lastname,
            email: req.params.email,
            password: req.params.password,
            role:req.params.role,


        });
        await newUser.save();
        console.log("un user cree avec succes");
        res.json(newUser);
        return;


    } catch (error) {
        console.log("erreur lors de la creation de user",error);
        res.send("erreur lors de la creation de user");
        return;

    }

 
});



app.get("/getAllEmployees",async (req:Request , res: Response) => {
    try{
        const employees = await UserModel.find({ role: 'employee' });
        res.json(employees);
        return;
    }catch(error){
        console.log("erreur lors de la recuperation des employees ",error);
        res.send("erreur lors de la recuperation des employees " );
        return;

    }

});





app.get("/getSpecificEmployees/:firstname",async (req:Request , res: Response) => {
    try{
        const firstname = req.params.firstname;
        const employees =await UserModel.find({ firstname, role: 'employee' });
        
        
        if (employees.length === 0) {
             res.json({ message: "Aucun employé trouvé avec ce prénom." });
             return;
          }
        res.json(employees);
        return;
    }catch(error){
        console.log("erreur lors de la recuperation des employees ",error);
        res.send("erreur lors de la recuperation des employees " );
        return;

    }

})

app.get("/getAdmin",async (req:Request , res: Response) => {
    try{
        const admin = await UserModel.find({role: 'admin' });
        res.json(admin);
        return;
    }catch(error){
        console.log("erreur lors de la recuperation de l admin ",error);
        res.send("erreur lors de la recuperation de l admin " );
        return;

    }

});