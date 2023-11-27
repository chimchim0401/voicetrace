import mongoose from 'mongoose';
import fs from 'fs';
import PDFDocument from 'pdfkit';

const RecordsSchema = new mongoose.Schema({
    duree: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
});



const RecordsModel = mongoose.model('Record', RecordsSchema);
export default RecordsModel ;

