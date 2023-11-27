import React, { useState } from 'react';
import './login.css';
import { useAuth } from '../AuthContext';

import { useNavigate } from 'react-router-dom';

function VerifyCode() {
    const [code, setCode] = useState('');
    const { codeG } = useAuth();
    const [showMsg, setShowMsg] = useState(false);
    const [msgErreur , setMsgErreur] = useState('');
    const navigate = useNavigate();


    const handleVerifyCode = async () => {
      try {
      if (!code ) {
        setMsgErreur('Veuillez remplir Code');
        return;
      } 

  
        if (code === codeG) {
          setMsgErreur("");
          navigate('/ChangePass');
        } else {
          setMsgErreur("code est incorrect");
        }
      
    } catch (error) {
      console.log(error)
    }
  }
    
  return (
    <div className='containerLogin'>
      <p className='title'>Nous avons envoyé un code de vérification</p>
      <p className='title'> à votre adresse e-mail</p>
      <p className='Stitle'>Saisissez le code de vérification envoyé</p>
      <div className='inputStyle'>
      <input
        type="text"
        placeholder="code de vérification"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      </div>
      <button className='buttonStyle' onClick={() => { handleVerifyCode(); setShowMsg(true); }}>Envoyer</button><br />
      
      {showMsg? <p className='errorStyle' >{msgErreur}</p> :  <p></p> }
    </div>
  )
}

export default VerifyCode
