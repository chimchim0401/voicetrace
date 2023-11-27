import express from 'express';

import {getAllEmployees ,getEmployee, deleteEmployee , saveEmployee , updateEmploye , checkEmail} from "../controllers/Employee"

const router = express.Router();

router.get('/employees/checkEmail' , checkEmail)
router.get('/employees', getAllEmployees);
router.get('/employees/:id', getEmployee);
router.delete('/employees/delete/:id', deleteEmployee);
router.post('/employees/add', saveEmployee);
router.put('/employees/update/:id', updateEmploye);


export default router;