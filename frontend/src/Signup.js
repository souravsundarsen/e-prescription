import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './SignupValidation';
import axios from 'axios';

function Signup() {

    /*       Validation for SignUp            */

    const [values, setValues] = useState({
        name : '',
        gender: '',
        qualification : '',
        registrationno : '',
        email : '',
        password : '',
        mobileno : '',
        address : '',
        hospital : '',
        otherdetails : ''

    })

    const [errors, setErrors] = useState({})
    const navigate = useNavigate();

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const err = Validation(values);  
        setErrors(err); 
        //setErrors(Validation(values));

        if(err.name === "" && err.gender === "" && err.qualification === "" && err.registrationno === ""
            && err.email === "" && err.password === "" && err.mobileno === "" && err.address === ""
            && err.hospital === "" && err.otherdetails === ""){
                axios.post('http://localhost:8081/signup', values)
                .then(res => {
                    navigate('/');
                })
                .catch(err => console.log(err));
            }
    }
    
    

    return (

    <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="bg-white p-3 rounded w-50">
            <h2 align="center">Register Yourself</h2>
            <form action="" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="name"><strong>Your Name: </strong></label>
                        <input type="text" placeholder="Enter Your Name" name="name"
                            onChange={handleInput} className="form-control rounded-0" />
                        {errors.name && <span className="text-danger"> {errors.name} </span>}
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="gender"><strong>Gender: </strong></label>
                        <select name="gender" onChange={handleInput} className="form-control rounded-0">
                            <option value="" disabled selected>Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.gender && <span className="text-danger"> {errors.gender} </span>}
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="qualification"><strong>Your Qualification: </strong></label>
                        <input type="text" placeholder="Enter Your Qualification" name="qualification"
                            onChange={handleInput} className="form-control rounded-0" />
                        {errors.qualification && <span className="text-danger"> {errors.qualification} </span>}
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="registrationno"><strong>Registration Number: </strong></label>
                        <input type="text" placeholder="Enter Registration Number" name="registrationno"
                            onChange={handleInput} className="form-control rounded-0" />
                        {errors.registrationno && <span className="text-danger"> {errors.registrationno} </span>}
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="email"><strong>Your Email: </strong></label>
                        <input type="email" placeholder="Enter Your Email ID" name="email"
                            onChange={handleInput} className="form-control rounded-0" />
                        {errors.email && <span className="text-danger"> {errors.email} </span>}
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="password"><strong>Password: </strong></label>
                        <input type="password" placeholder="Enter Your Password" name="password"
                            onChange={handleInput} className="form-control rounded-0" />
                        {errors.password && <span className="text-danger"> {errors.password} </span>}
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="mobileno"><strong>Mobile Number: </strong></label>
                        <input type="text" placeholder="Enter Your Mobile Number" name="mobileno"
                            onChange={handleInput} className="form-control rounded-0" />
                        {errors.mobileno && <span className="text-danger"> {errors.mobileno} </span>}
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="address"><strong>Your Address: </strong></label>
                        <input type="text" placeholder="Enter Your Address" name="address"
                            onChange={handleInput} className="form-control rounded-0" />
                        {errors.address && <span className="text-danger"> {errors.address} </span>}
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="hospital"><strong>Hospital Name: </strong></label>
                        <input type="text" placeholder="Enter Hospital Name" name="hospital"
                            onChange={handleInput} className="form-control rounded-0" />
                        {errors.hospital && <span className="text-danger"> {errors.hospital} </span>}
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="otherdetails"><strong>Other Details: </strong></label>
                        <input type="text" placeholder="Enter Other Details" name="otherdetails"
                            onChange={handleInput} className="form-control rounded-0" />
                        {errors.otherdetails && <span className="text-danger"> {errors.otherdetails} </span>}
                    </div>
                </div>

                <button type="submit" className="btn btn-outline-success w-100 rounded-0">Sign Up</button>
                <p></p>
                <Link to="/login" className="btn btn-outline-primary w-100 rounded-0 text-decoration-none">Log In</Link>
            </form>
        </div>
    </div>

  )
}

export default Signup
