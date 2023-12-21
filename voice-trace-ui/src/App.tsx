import React from 'react';


import {BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import './App.css';
import AddEmployee from './pages/AddEmployee';
import UpdateEmployee from './pages/UpdateEmployee';
import Home from './pages/Home' ;
import Login from './pages/login'
import ResetPass from './pages/resetPass'
import VerifyCode from './pages/verifyCode'
import ChangePass from './pages/changePass'
import { AuthProvider } from './AuthContext';
import FindUser from './pages/FindUser';
import Records from './pages/Records';
import Report from './pages/Report';
import AddRecord from './pages/AddRecord';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/ResetPass" element={<ResetPass />} />
          <Route path="/VerifyCode" element={<VerifyCode />} />
          <Route path="/ChangePass" element={<ChangePass />} />
          <Route path="/employees" element={<FindUser />}></Route>
          <Route path="/employees/add" element={<AddEmployee />}></Route>
          <Route path="/employees/update/:id" element={<UpdateEmployee />}></Route>
          <Route path="/records" element={<Records />}></Route>
          <Route path="/report" element={<Report />}></Route>
          <Route path="/addRecord" element={<AddRecord />}></Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}


export default App;
