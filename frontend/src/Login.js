import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';

function Login() {
  
    /*      ------------- Validation for LogIn  ---------------         */

    const [values, setValues] = useState({
        email : '',
        password : ''

    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const err = Validation(values);  
        setErrors(err);

        if(err.email === "" && err.password === ""){
                axios.post('http://localhost:8081/login', values)           // sending data to server.js
                .then(res => {
                
                    if(res.data.success){
                        localStorage.setItem("token", res.data.token);
                        localStorage.setItem("doctorName", res.data.doctor.name);
                        localStorage.setItem("doctorQualification", res.data.doctor.qualification);
                        localStorage.setItem("doctorRegNo", res.data.doctor.registration_no);
                        localStorage.setItem("doctorAddress", res.data.doctor.address);
                        localStorage.setItem("doctorId", res.data.doctor.id);
                        navigate('/');
                    }
                    else{
                        alert("Invalid credentials. Please try again.");
                    }
                })
                .catch((err) => {
                    console.error("Login Error:", err);
                    alert("Something went wrong. Please try again later.");
                });
            }
    }
  
    return (

    <div className='d-flex justify-content-center align-items-center vh-100'>
        <div className='bg-white p-3 rounded w-25'>
            <h2 align='center'>Sign In</h2>
            <form action="" onSubmit={handleSubmit}>
                <div className='mb3'>
                    <label htmlFor='email'><strong>Email: </strong></label>
                    <input type='email' placeholder="Enter Your Email ID"  name='email' 
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.email && <span className='text-danger'> {errors.email} </span>}
                </div>
                <div className='mb3'>
                    <label htmlFor='password'><strong>Password: </strong></label>
                    <input type='password' placeholder="Enter Your Password"  name='password' 
                    onChange={handleInput} className='form-control rounded-0' />
                    {errors.password && <span className='text-danger'> {errors.password} </span>}
                </div>
                <p></p>
                <button type='submit' className='btn btn-outline-success w-100 rounded-0'>LogIn</button>
                <p></p>
                <Link to="/signup" className='btn btn-outline-primary w-100 rounded-0 text-decoration-none'>Register Yourself </Link>
            </form>
        </div>
    </div>

  )
}

export default Login
