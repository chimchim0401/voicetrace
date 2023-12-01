import React, { useState} from 'react';
import '../styles/login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';



function ResetPass() {
    const { email, setEmail } = useAuth();
    const [showMsg, setShowMsg] = useState(false);
    const [msgErreur , setMsgErreur] = useState('');
    const navigate = useNavigate();
    const { codeG, setCodeG } = useAuth();


    const handleResetPass = async () => {
      if (!email ) {
        setMsgErreur('Veuillez remplir Email');
        return;
      } 
  
      try {
        const response = await axios.post('http://localhost:3000/auth/verifyEmail', {
          email,
        });
  
        if (response.status === 200) {
          const { code } = response.data;
          setMsgErreur("");
          setCodeG(code);
          navigate('/VerifyCode');
        } else {
          setMsgErreur("Email est incorrect");
        }
      } catch (error) {
        setMsgErreur("Email est incorrect");
      }
    }
  return (
    <div className="containerDiv" >
    <div className='container containerLogin'>
      <p className='title'>Rénitialisez votre mot de passe</p>
      <div className='inputStyle'>
      <input
        type="text"
        placeholder="Adresse e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      </div>
      <button className='buttonStyle' onClick={() => { handleResetPass(); setShowMsg(true); }}>Rénitialiser votre mot de passe</button><br />
      <Link to="/" className='linkStyle'><text>Retour</text></Link><br/>
      {showMsg? <p className='errorStyle'>{msgErreur}</p> :  <p></p> }
    </div>
    </div>
  )
}

export default ResetPass
