import React, { useState } from 'react';
import '../styles/login.css';
import { BsFillPersonFill } from 'react-icons/bs';
import { AiFillLock , AiFillEye , AiFillEyeInvisible} from 'react-icons/ai';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [msgErreur , setMsgErreur] = useState('');
  const [id , setId] = useState('');
  const [token , setToken] = useState('');
  const [role , setRole] = useState('');
  const [showMsg , setShowMsg] = useState(false);
  const navigate = useNavigate(); 

  const handleLogin = async () => {

    if (!email && !password) {
      setMsgErreur('Veuillez remplir Email et mot de passe');
      return;
    } else if (!email ) {
      setMsgErreur('Veuillez remplir Email');
      return;
    } else if (!password) {
      setMsgErreur('Veuillez remplir mot de passe');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, id , role } = response.data;
         setToken(token);
         setId(id);
         setRole(role);
         console.log(token , id , role);
         if(role==="ADMIN"){
          navigate('/Home');
         } else {
          navigate('/employees/add'); 
         }
         
      } else {
        setMsgErreur("Email ou Mot de passe est incorrect");
      }
    } catch (error) {
      setMsgErreur("Email ou Mot de passe est incorrect");
    }
  }

  return (
    <div className="containerDiv" >
    <div className='containerLogin'>
      <h2>Connexion</h2>
      <div className='inputStyle'>
      <BsFillPersonFill className='icon'/>
      <input
        type="text"
        placeholder="Nom d'utilisateur"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      </div>
      <div className='inputStyle'>
       <AiFillLock className='iconPass'/>
      <input
        type={showPass ? "text"  : "password" }
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {showPass ? <AiFillEye className='icon' onClick={() =>setShowPass(!showPass)}/> : <AiFillEyeInvisible className='icon' onClick={() =>setShowPass(!showPass)}/>}
      </div>
      <Link to="ResetPass" className='linkStyle'><text>Mot de passe oublié ?</text></Link><br/>
      <button className='buttonStyle' onClick={() => { handleLogin(); setShowMsg(true); }}>Se connecter</button>
      {showMsg? <p className='errorStyle'>{msgErreur}</p> :  <p></p> }
    </div>
    </div>
  );
};

export default Login;