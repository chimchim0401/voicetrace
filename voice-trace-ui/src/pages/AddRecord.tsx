import React, {ChangeEvent, useState} from 'react'
import Navbar from '../components/Navbar'
import '../styles/addRecord.css'
import axios from 'axios';

function AddRecord() {
    const [SelectedRecord, setSelectedRecord] = useState<File | null>(null);


      const handleRecordChange = (event: ChangeEvent<HTMLInputElement>) => {
        const record: File | null = event.target.files?.[0] || null;
        setSelectedRecord(record);
      };

      const handleUpload = async () => {
        if (SelectedRecord) {
          const formData = new FormData();
          formData.append('file', SelectedRecord);
    
          try {
            await axios.post('http://localhost:5000/upload', formData);
            alert('Fichier téléchargé avec succès !');
          } catch (error) {
            console.error('Erreur lors du téléchargement du fichier :', error);
          }
        }
      };


  return (
    <div>
      <Navbar />
      <div className='divCon'>
      <h1 >Ajouter un enregistrement</h1>
      <input type="file" onChange={handleRecordChange} />
      <button onClick={handleUpload}>Ajouter</button>
      </div>
    </div>
  )
}

export default AddRecord
