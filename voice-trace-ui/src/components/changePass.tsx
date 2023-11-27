import React, { useState } from 'react';
import './login.css';
import { AiFillEye , AiFillEyeInvisible} from 'react-icons/ai';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function ChangePass(){
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const { email, setEmail } = useAuth();
    const [showMsg, setShowMsg] = useState(false);
    const [msgErreur , setMsgErreur] = useState('');
    const navigate = useNavigate();


    const handleChangePass = async () => {
      
      if (!confPassword && !password) {
        setMsgErreur('Veuillez remplir mot de passe ');
        return;
      } else if (!password ) {
        setMsgErreur('Veuillez remplir mot de passe');
        return;
      } else if (!confPassword) {
        setMsgErreur('Veuillez confirmer mot de passe');
        return;
      }

      if (confPassword === password) {
     
      try {
        const response = await axios.post('http://localhost:3000/auth/ChangePass', {
          email,
          password,
        });

        if (response.status === 200) {
          navigate('/');
          setMsgErreur("");
        } else {
          setMsgErreur("Email est incorrect");
        }
      } catch (error) {
        setMsgErreur("Email est incorrect");
      }
    }else {
      setMsgErreur(',kljkhgftdfghj');
      return;
    }
  
    }




  return (
    <div className='container containerLogin'>
      <p className='title'>choisir un nouveau mot de passe</p>
      <div className='inputStyle'>
      <input
        type={showPass ? "text"  : "password" }
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {showPass ? <AiFillEye className='icon' onClick={() =>setShowPass(!showPass)}/> : <AiFillEyeInvisible className='icon' onClick={() =>setShowPass(!showPass)}/>}
      </div>
      <div className='inputStyle'>
      <input
        type={showPass ? "text"  : "password" }
        placeholder="Mot de passe"
        value={confPassword}
        onChange={(e) => setConfPassword(e.target.value)}
      />
      {showPass ? <AiFillEye className='icon' onClick={() =>setShowPass(!showPass)}/> : <AiFillEyeInvisible className='icon' onClick={() =>setShowPass(!showPass)}/>}
      </div>
      <button className='buttonStyle'onClick={() => { handleChangePass(); setShowMsg(true); }}>Modifier</button><br />
      
      {showMsg? <p className='errorStyle' >{msgErreur}</p> :  <p></p> }
    </div>
  );
};

export default ChangePass;