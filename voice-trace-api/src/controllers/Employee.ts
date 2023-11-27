import { Request, Response } from 'express';
import {getEmployees , getEmployeeById , getEmployeeByEmail, createEmployee , deleteEmployeeById, updateEmployeeById} from '../models/Employee' ;
import EmployeeModel  from '../models/Employee';
import UserModel, {createUser , updateUserById , deleteUserById , getUserByEmail} from '../models/User' ;

import bcrypt from 'bcrypt';

export const getAllEmployees = async (req: Request, res: Response) => {
    try {
        const employes = await getEmployees();
        res.status(200).json(employes);
    } catch (error) {
        console.log(error);
        res.status(500);
    }
};

export const deleteEmployee = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const employee = await getEmployeeById(id);
        if(!employee){
            return res.status(404).json({ message: 'Employee not found' });
        }
        const employeeEmail = employee.email  ;
        const user = await getUserByEmail(employeeEmail) ;
        await deleteEmployeeById(id);
        await deleteUserById(user?.id);
        res.status(200).json({ message: 'Employe  deleted' });
    } catch (error) {
        console.log(error);
        res.status(500);
    }
}

export const getEmployee = async(req: Request, res: Response)=>{
    try {
        const { id } = req.params;
        const employee = await getEmployeeById(id);
        res.status(200).json(employee);
    } catch (error) {
        console.log(error);
        res.status(500);
    }

}


export const saveEmployee = async (req: Request, res: Response) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        if (!firstname || !lastname || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const employeeAlreadyExists = await getEmployeeByEmail(email);
        if (employeeAlreadyExists) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const hashedpassword = await bcrypt.hash(password, 10);
        
        const user= createUser({
            firstname,
            lastname,
            email,
            password:hashedpassword,
            role:"EMPLOYEE" ,

        })
        const employee = await createEmployee({
            firstname,
            lastname,
            email,
            password:hashedpassword,
            role:"EMPLOYEE" ,
            records: []
        });
        res.status(200).json(employee);
    } catch (error) {
        console.log(error);
        res.status(500);
    }
}
export const checkEmail= async (req: Request, res: Response) => {
    const email = req.query.email as string;
    try{
        
    const employee = await getEmployeeByEmail(email);
    
    if(employee){
        res.status(200).json({ exists: true });

    }else{
        res.status(200).json({ exists: false });
    }
    }catch(e){
    //console.log(e);
    console.log('email error') ;
    }

}
export const updateEmploye = async (req: Request, res: Response) => {
    try {
        const { firstname, lastname, email } = req.body;
        const { id } = req.params;
        if (!firstname || !lastname || !email ) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const employee = await getEmployeeById(id) ;

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Step 2: Get the email of the employee
    
    
    const employeeEmail = employee.email ;
    // Step 3: Get the user by email
    const user = await getUserByEmail(employeeEmail);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    
        const updatedUser =await UserModel.findByIdAndUpdate(
            user._id,
            {
                $set: {
                    firstname,
                    lastname,
                    email,
                    
                },
            },
            { new: true } 

        );
        
        const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
            id,
            {
                $set: {
                    firstname,
                    lastname,
                    email,
                    
                },
            },
            { new: true } 
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        
        res.status(200).json(updatedUser);
        res.status(200).json(updatedEmployee);
    } catch (error) {
        console.log(error);
        res.status(500);
    }
};
