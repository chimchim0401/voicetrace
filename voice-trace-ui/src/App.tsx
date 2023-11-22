import React from 'react';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import './App.css';
import AddEmployee from './pages/AddEmployee';
import UpdateEmployee from './pages/UpdateEmployee';
import Home from './pages/Home' ;
function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/employees/add" element={<AddEmployee />}></Route>
        <Route path="/employees/update/:id" element={<UpdateEmployee />}></Route>
      </Routes>
    </Router>
   
  );
}

export default App;
