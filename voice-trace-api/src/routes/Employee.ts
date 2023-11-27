import express from 'express';

import * as emp from "../controllers/Employee"

const router = express.Router();

router.get('/employees/checkEmail' , emp.checkEmail)
router.get('/employees', emp.getAllEmployees);
router.get('/employees/:id', emp.getEmployee);
router.delete('/employees/delete/:id', emp.deleteEmployee);
router.post('/employees/add', emp.saveEmployee);
router.put('/employees/update/:id', emp.updateEmploye);


export default router;