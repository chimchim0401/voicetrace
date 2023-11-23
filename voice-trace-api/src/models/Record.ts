import mongoose from 'mongoose';

const RecordsSchema = new mongoose.Schema({
    date: {
        type: Date,
        
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee', // Référence le modèle Employe
        
    },
    // Autres champs spécifiques aux enregistrements
});

const RecordsModel = mongoose.model('Records', RecordsSchema);
export default RecordsModel ;


