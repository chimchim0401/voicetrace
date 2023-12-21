import { Request, Response } from 'express';
import RapportModel from '../models/Rapport'; 
import RecordModel from '../models/Record'; 
import { generatePdfReport } from '../controllers/GenerateRapport'; 
import router from './Employee';
import multer from 'multer';


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'records/');
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), (req : Request, res : Response) => {
  res.status(200).send('File uploaded successfully!');
});

router.post('/record', async (req: Request, res: Response) => {
  try {
    const {duree, employee } = req.body;

    // Create a new record
    const record = new RecordModel({
        duree: duree,
        date: new Date(),
        employee: employee,
    });

    // Save the record to the database
    const savedRecord = await record.save();

    // Create a new rapport associated with the saved record
    const rapport = new RapportModel({ 
      Record: savedRecord._id ,
      Messages: [
        {
          user: {
            name: 'John Doe',
            role: 'Admin'
          },
          text: 'Hello, how are you?'
        },
        {
          user: {
            name: 'Jane Smith',
            role: 'User'
          },
          text: 'I am doing great, thanks!'
        },
        {
          user: {
            name: 'John Doe',
            role: 'Admin'
          },
          text: 'That is good to hear'
        }
      ],
      Summary: 'This is a summary of the record'});

    // Save the rapport to the database
    const savedRapport = await rapport.save();
    res.json({ record: savedRecord, rapport: savedRapport });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/records', async (req: Request, res: Response) => {
  try {
    const records = await RecordModel.find();
    res.json(records);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/records/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { duree, employee, date } = req.body;

    const updatedRecord = await RecordModel.findByIdAndUpdate(
      id,
      { duree, employee, date },
      { new: true }
    );

    if (!updatedRecord) {
      return res.status(404).json({ error: 'Record not found' });
    }

    res.json(updatedRecord);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/records/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedRecord = await RecordModel.findByIdAndDelete(id);

    if (!deletedRecord) {
      return res.status(404).json({ error: 'Record not found' });
    }

    res.json({ message: 'Record deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});



export default router;
