import express, { Request, Response, Router } from 'express';
import {login , verifyEmail, changePass, checkLogin} from '../controllers/LoginController'
import * as emp from "../controllers/Employee"
import RecordModel from '../models/Record'; 
import RapportModel from '../models/Rapport';



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



router.get('/records', async (req: Request, res: Response) => {
    try {
      const records = await RecordModel.find();
      res.json(records);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });



router.post('/report', async (req: Request, res: Response) => {
    const { id } = req.body;
    try {
        // find report by Record(ObjectId) id
        const report = await RapportModel.findOne({ Record: id });
        if (report) {
            res.json(report);
        } else {
            res.status(404).json({ message: 'Report not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});


export default router;
