
import mongoose from 'mongoose';

const rapportSchema = new mongoose.Schema({
  Record: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Record'
  },
  Messages: [
    {
      speaker: {
        type: String,
        required: true
      },
      text: {
        type: String,
        required: true
      }
    }
  ],
  Summary: {
    type: String,
    required: true
  },

  dateCreation: {
    type: Date,
    default: Date.now
  }
});

const RapportsModel = mongoose.model('Rapport', rapportSchema);
export default RapportsModel ;
 
