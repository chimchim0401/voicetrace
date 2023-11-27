import express, { Request, Response, Router } from 'express';
import {login , verifyEmail, changePass, checkLogin} from '../controllers/LoginController'

const router: Router = express.Router();


router.post('/login', login);
router.post('/verifyEmail', verifyEmail);
router.post('/ChangePass', changePass);
router.get('/check-login', checkLogin);

export default router;
