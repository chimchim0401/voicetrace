import React from 'react';


import {BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import './App.css';
import AddEmployee from './pages/AddEmployee';
import UpdateEmployee from './pages/UpdateEmployee';
import Home from './pages/Home' ;
import Login from './components/login'
import ResetPass from './components/resetPass'
import VerifyCode from './components/verifyCode'
import ChangePass from './components/changePass'
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/employees/add" element={<AddEmployee />}></Route>
          <Route path="/employees/update/:id" element={<UpdateEmployee />}></Route>
          <Route path="/" element={<Login />} />
          <Route path="/ResetPass" element={<ResetPass />} />
          <Route path="/VerifyCode" element={<VerifyCode />} />
          <Route path="/ChangePass" element={<ChangePass />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}


export default App;