import express, { Request, Response, Router } from 'express';
import {login , verifyEmail, changePass, checkLogin} from '../controllers/LoginController'
import * as emp from "../controllers/Employee"
const router: Router = express.Router();


router.post('/login', login);
router.post('/verifyEmail', verifyEmail);
router.post('/ChangePass', changePass);
router.get('/check-login', checkLogin);
router.get('/employees/checkEmail' , emp.checkEmail)
router.get('/employees', emp.getAllEmployees);
router.get('/employees/:id', emp.getEmployee);
router.delete('/employees/delete/:id', emp.deleteEmployee);
router.post('/employees/add', emp.saveEmployee);
router.put('/employees/update/:id', emp.updateEmploye);

export default router;
