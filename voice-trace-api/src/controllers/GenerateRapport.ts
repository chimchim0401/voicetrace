import fs from 'fs';
import PDFDocument from 'pdfkit';
import RapportModel from '../models/Rapport'; 
import RecordModel from '../models/Record'; 

export async function generatePdfReport(reportId: any) {
  try {
    // Fetch the report data from the database
    const report = await RapportModel.findById(reportId).populate('Record');

    if (!report) {
      throw new Error('Report not found');
    }

    // Create a PDF document
    const pdfDoc = new PDFDocument();
    const pdfStream = fs.createWriteStream(`report_${reportId}.pdf`);

    // Pipe the PDF document to a file
    pdfDoc.pipe(pdfStream);

    // Add content to the PDF document based on the report data
    pdfDoc.fontSize(14).text('Report Details', { align: 'center' });

    if (report.Record) {
      // Access properties only if report.Record is defined
      pdfDoc.text(`Date of Creation: ${report.dateCreation}`)
        //.text('Record Details:')
        //.text(`- Duration: ${report.Record.duree}`)
        //.text(`- Date: ${report.Record.date}`)
        //.text(`- Employee: ${report.Record.employee}`);
    } else {
      pdfDoc.text('No Record details available.');
    }

    // Finalize the PDF document
    pdfDoc.end();

    console.log(`PDF report generated for Report ID: ${reportId}`);
  } catch (err: any) {
    console.error('Error generating PDF report:', err.message);
  }
}

