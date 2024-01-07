import React, { ChangeEvent, useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../styles/addRecord.css';
import axios from 'axios';

function AddRecord() {
  const [SelectedRecord, setSelectedRecord] = useState<File | null>(null);
  const [SelectedAgent, setSelectedAgent] = useState<string>('');
  const [Agents, setAgents] = useState<any[]>([]);
  const [errorFetchingAgents, setErrorFetchingAgents] = useState<string | null>(null);

  const handleRecordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const record: File | null = event.target.files?.[0] || null;
    setSelectedRecord(record);
  };

  const handleAgentChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const agent: string = event.target.value;
    setSelectedAgent(agent);
  };

  // fetch agents from database
  const fetchAgents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/auth/employees');
      setAgents(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des agents :', error);
      setErrorFetchingAgents('Erreur lors de la récupération des agents.');
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []); // Fetch agents on component mount

  const handleUpload = async () => {
    if (SelectedRecord) {
      const formData = new FormData();
      formData.append('file', SelectedRecord);
      formData.append('agent', SelectedAgent);

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
        <h1>Selectionner un fichier</h1>
        <input type="file" onChange={handleRecordChange} className="fileInput" />
        <div className='divCon'>
          <h2>Selectionner un agent</h2>
          <select style={{ width: '200px', height: '30px' }} onChange={handleAgentChange}>
            <option value="">Sélectionner un agent</option>
            {Agents.map((agent) => (
              <option key={agent._id} value={agent._id}>
                {agent.firstname} {agent.lastname}
              </option>
            ))}
          </select>
        </div>

        {errorFetchingAgents && <p className="error">{errorFetchingAgents}</p>}

        <button onClick={handleUpload} disabled={!SelectedRecord}>
          Ajouter
        </button>
        {SelectedRecord && <p>Selected file: {SelectedRecord.name}</p>}
      </div>
    </div>
  );
}

export default AddRecord;
