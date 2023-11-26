
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams } from 'react-router-dom'; // Importez useParams
import Navbar from '../components/Navbar';
import axios from 'axios';
import '../styles/AddEmployee.css';
import Employee from '../models/Employee'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateEmployee: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 

  const [formData, setFormData] = useState<Employee>({
    firstname: '',
    lastname: '',
    email: '',
    password:''
  });

  useEffect(() => {
    
    axios.get(`http://localhost:5000/employees/${id}`).then((response) => {
      const employeeData = response.data;
      setFormData({
        firstname: employeeData.firstname,
        lastname: employeeData.lastname,
        email: employeeData.email,
        password:employeeData.password
      });
    });
  }, [id]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:5000/employees/update/${id}`, formData);
      console.log(response.data);
      toast.success('Employee updated successfully', {
        position: 'bottom-right',
        autoClose: 3000, 
      });

      
    } catch (error) {
      console.error(error);
      toast.error('Error', {
        position: 'bottom-right',
        autoClose: 3000,
      });
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
                placeholder={formData.firstname}
                value={formData.firstname}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                className='field'
                type='text'
                name='lastname'
                placeholder={formData.lastname}
                value={formData.lastname}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                className='field'
                type='text'
                name='email'
                placeholder={formData.email}
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input className='button' type='submit' value='Update Employee' />
            </div>
          </form>
        </div>
        <div className='column'>
        <img className="image" src="/assets/cartoon_image.webp" width="450px" height="450px" alt='hello'/>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateEmployee;



