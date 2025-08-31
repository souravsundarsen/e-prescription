import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './PrescriptionValidation';
import axios from "axios";

function Prescription() {

    const [values, setValues] = useState({
            DoctorName: '',
            qualification: '',
            name : '',
            age : '',
            gender: '',
            patient_mobile: '',
            patient_address: '',
            complain: '',
            advice: '',
            medicine: '',
            notes: '',
            date: ''
        });

        const [errors, setErrors] = useState({});
        const navigate = useNavigate();
        
        //For date 
        useEffect(() => {
              const today = new Date();
              const formattedDate = today.toISOString().split("T")[0]; // Formats as YYYY-MM-DD
              
              //new code
              const doctorName = localStorage.getItem("doctorName");
              const qualification = localStorage.getItem("doctorQualification");
              const doctorId = localStorage.getItem("doctorId");
              const doctorReg = localStorage.getItem("doctorRegNo");
              const doctorAddress = localStorage.getItem("doctorAddress");

              setValues((prev) => ({ 
                ...prev, 
                DoctorName: doctorName,
                qualification: qualification,
                doctor_id: doctorId,
                doctor_regNo: doctorReg,
                doctoradd: doctorAddress,
                date: formattedDate

              }));
        }, [navigate]);
    
        
        //const navigate = useNavigate();
    
        const handleInput = (event) => {
            setValues(prev => ({...prev, [event.target.name]: event.target.value}))
        }
        const handleSubmit = async(event) => {
            event.preventDefault();
            const err = Validation(values);  
            setErrors(err); 

            try{
                // const res =           //it is giving a warning in future if it necessary then will use
            await
                axios.post('http://localhost:8081/prescription', 
                    {
                        date: values.date,
                        name: values.name,
                        age: values.age,
                        gender: values.gender,
                        patient_mobile: values.patient_mobile,
                        patient_address: values.patient_address,
                        complain: values.complain,
                        advice: values.advice,
                        medicine: values.medicine,
                        notes: values.notes,
                        doctor_id: values.doctor_id,
                        doctor_name: values.DoctorName,
                        doctor_degree: values.qualification,
                        doctor_address: values.doctoradd,
                        doctor_registrationno: values.doctor_regNo
                    }
                );
                alert('Prescription saved successfully!');
                navigate('/');
            }
            catch(err){
                console.error("Error in saving prescription",err);
                alert('Failed to save prescription');
            }
        };


    return (
    
    <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="bg-white p-3 rounded w-50">
        <Link to="/" className="btn btn-outline-primary ms-4">Back to Home</Link>
            <h2 align="center">Patient's Details</h2>
            <form action="" onSubmit={handleSubmit}>
            <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="DoctorName"><strong>Doctor's Name: </strong></label>
                        <input type="text" name="DoctorName" value={values.DoctorName}  readOnly
                            onChange={handleInput} className="form-control rounded-0" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="qualification"><strong>Qualification: </strong></label>
                        <input type="text" name="qualification" value={values.qualification}  readOnly
                            onChange={handleInput} className="form-control rounded-0" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="name"><strong>Patient Name: </strong></label>
                        <input type="text" placeholder="Enter Patient Name" name="name"
                            onChange={handleInput} className="form-control rounded-0" />
                        {errors.name && <span className="text-danger"> {errors.name} </span>}
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="date"><strong>Date: </strong></label>
                        <input type="date" value={values.date} readOnly name="date"
                            onChange={handleInput} className="form-control rounded-0" />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="age"><strong>Age: </strong></label>
                        <input type="text" placeholder="Enter Patient age" name="age"
                            onChange={handleInput} className="form-control rounded-0" />
                        {errors.age && <span className="text-danger"> {errors.age} </span>}
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
                        <label htmlFor="patient_mobile"><strong>Patient Mobile Number: </strong></label>
                        <input type="text" placeholder="Enter Patient Mobile Number" name="patient_mobile"
                            onChange={handleInput} className="form-control rounded-0" />
                        {errors.patient_mobile && <span className="text-danger"> {errors.patient_mobile} </span>}
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="patient_address"><strong>Patient Address: </strong></label>
                        <input type="text" placeholder="Enter Patient Address" name="patient_address"
                            onChange={handleInput} className="form-control rounded-0" />
                        {errors.patient_address && <span className="text-danger"> {errors.patient_address} </span>}
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="complain"><strong>Complain: </strong></label>
                        <input type="text" placeholder="Enter the problem of patient's" name="complain"
                            onChange={handleInput} className="form-control rounded-0" />
                        {errors.complain && <span className="text-danger"> {errors.complain} </span>}
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="advice"><strong>Advice: </strong></label>
                        <input type="text" placeholder="Enter Your Advice" name="advice"
                            onChange={handleInput} className="form-control rounded-0" />
                        {errors.advice && <span className="text-danger"> {errors.advice} </span>}
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="medicine"><strong>Medicine: </strong></label>
                        <input type="text" placeholder="Enter Medicine Name" name="medicine"
                            onChange={handleInput} className="form-control rounded-0" />
                        {errors.medicine && <span className="text-danger"> {errors.medicine} </span>}
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="notes"><strong>Notes: </strong></label>
                        <input type="text" placeholder="Enter any notes" name="notes"
                            onChange={handleInput} className="form-control rounded-0" />
                        {errors.notes && <span className="text-danger"> {errors.notes} </span>}
                    </div>
                </div>

                <button type="submit" className="btn btn-outline-success w-100 rounded-0">Submit</button>
            </form>
        </div>
    </div>

  )
}

export default Prescription
