import React, { useState, ChangeEvent, FormEvent } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios'; // Importez Axios
import '../styles/AddEmployee.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmailValidator from "../validators/EmailValidator" ;
import Employee from '../models/Employee';


const AddEmployee: React.FC = () => {
  // Définissez l'état pour les champs du formulaire
  const [formData, setFormData] = useState<Employee>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const [valid , setValid] = useState(true) ;
  
  // Gestionnaire de changement pour les champs du formulaire
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Gestionnaire de soumission du formulaire
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if(EmailValidator(formData.email)){
        setValid(true) ;
        const response = await axios.get(`http://localhost:5000/auth/employees/checkEmail?email=${formData.email}`);
        const { exists } = response.data;
        if(exists){
          toast.error('Employee already exists', {
            position: 'bottom-right',
            autoClose: 1000,
          });
          
        }else{
          
          const response = await axios.post('http://localhost:5000/auth/employees/add', formData);

          console.log(response.data); // Affichez la réponse du serveur
          toast.success('Employee added successfully', {
            position: 'bottom-right',
            autoClose: 3000, // Ferme l'alerte après 3 secondes
          });
    
          // Réinitialisez le formulaire
          setFormData({
            firstname: '',
            lastname: '',
            email: '',
            password: '',
          });
        }
        
      

      }else{
        setValid(false);
      }
      
      
    } catch (error) {
        toast.error('An error occurred', {
            position: 'bottom-right',
            autoClose: 3000,
          });
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='row'>
        <div className='column'>
          <form className='form' onSubmit={handleSubmit}>
            <div>
              <input
                className='field'
                type='text'
                name='firstname'
                placeholder='Firstname'
                value={formData.firstname}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <input
                className='field'
                type='text'
                name='lastname'
                placeholder='Lastname'
                value={formData.lastname}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <input
                className='field'
                type='text'
                name='email'
                placeholder='Email'
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
           {
             !valid ? (<div style={{color:'red' , textIndent:'10px'}}>email invalid</div>):null 
             
           }
          
            <div>
              <input
                className='field'
                type='password'
                name='password'
                placeholder='Password'
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <input className='button' type='submit' value='Add Employee' />
            </div>
          </form>
        </div>
        <div className='column'>
          <img
            className='image'
            src='/assets/cartoon_image_2.webp'
            width='650px'
            height='450px'
            alt='hello'
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddEmployee;




