import React from 'react';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import './App.css';
import AddEmployee from './pages/AddEmployee';
import UpdateEmployee from './pages/UpdateEmployee';
import Home from './pages/Home' ;
import Records from './pages/Records' ;
import Navbar from './components/Navbar';
import Report from './pages/Report';
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
    <Navbar />
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/employees/add" element={<AddEmployee />}></Route>
        <Route path="/employees/update/:id" element={<UpdateEmployee />}></Route>
        <Route path="/records" element={<Records />}></Route>
        <Route path="/reports/:id" element={<Report />}></Route>
      </Routes>
    </Router>
    </ChakraProvider>
   
  );
}

export default App;
