import { Request, Response } from 'express';
import express from 'express';
import RapportModel from '../models/Rapport';

const router = express.Router();
// post with id of record retune report in json 
router.post('/reports', async (req: Request, res: Response) => {
    const id = req.body.id;
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
