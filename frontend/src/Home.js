import React, {useEffect, useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

function Home() {

  const navigate = useNavigate();
  const [doctorName, setDoctorName] = useState("");
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    
    const name = localStorage.getItem("doctorName");
    if(name){
      setDoctorName(name);
    }
    else{
      navigate("/login");
    }

    const doctorId = localStorage.getItem('doctorId');
    if(doctorId){
      axios.get(`http://localhost:8081/prescriptions/${doctorId}`)
      .then(response=>{
        setPrescriptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching prescriptions',error);
      });
    }

  }, [navigate]);

  // PDF Generate
  const generatePDF = (prescription) => {
    const doc = new jsPDF();

    const formattedDate = new Date(prescription.date).toLocaleDateString('en-GB');
    const finalDate = formattedDate.replace(/\//g,'-');
  
    // HEADER
    doc.setFontSize(14);
    doc.text(`${finalDate}`, 105, 20, { align: "center" });
  
    doc.setFontSize(18);
    doc.text(`Dr. ${prescription.doctor_name}`, 105, 30, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text(` ${prescription.doctor_degree}`, 105, 38, { align: "center" });
    doc.text(` ${prescription.doctor_registrationno}`, 105, 46, { align: "center" });
    doc.text(` ${prescription.doctor_address}`, 105, 54, { align: "center" });
  
    // Divider
    doc.line(14, 60, 196, 60);
  
    // PATIENT INFO
    doc.setFontSize(12);
    doc.text(`Patient Name: ${prescription.name}`, 14, 70);
    doc.text(`Age: ${prescription.age}`, 14, 78);
    doc.text(`Gender: ${prescription.gender}`, 14, 86);
    doc.text(`Mobile: ${prescription.mobile_no}`, 14, 94);
    doc.text(`Address: ${prescription.address}`, 14, 102);
  
    // Another Divider
    doc.line(14, 108, 196, 108);
  
    // TABLE
    doc.autoTable({
      startY: 112,
      head: [['Complain', 'Advice', 'Medicine', 'Notes']],
      body: [[
        prescription.complain || '',
        prescription.Advice || '',
        prescription.medicine || '',
        prescription.notes || '',
      ]],
      styles: {
        fontSize: 12,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [0, 123, 255],
        textColor: 255,
      }
    });
  
    // FOOTER
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(10);
    doc.text(`Dr. ${prescription.doctor_name}, ${prescription.doctor_degree}`, 14, pageHeight-10);
  
    // SAVE
    doc.save(`Prescription_${prescription.name}.pdf`);
  };
  

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <div className="d-flex justify-content-start align-items-center">
        <h2 style={{ color: "aqua" }} className="me-3">
          Welcome Dr. {doctorName}
        </h2>
        <Link to="/prescription" className='btn btn-success ms-4'> New Prescription </Link>
        <button onClick={handleLogout} className="btn btn-danger ms-4">
          Logout
        </button>
      </div>
      <p> </p>

      <div className="container mt-5">
          <h3 style={{ color: "#0dcaf0" }} className="me-3">Prescription List</h3>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Patient Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Mobile</th>
                        <th>Complain</th>
                        <th>Advice</th>
                        <th>Medicine</th>
                        <th>Notes</th>
                        <th>Date</th>
                        <th>Action</th> {/* For PDF later */}
                    </tr>
                </thead>
                <tbody>
                    {prescriptions.map((prescription, index) => (
                        <tr key={index}>
                            <td>{prescription.name}</td>
                            <td>{prescription.age}</td>
                            <td>{prescription.gender}</td>
                            <td>{prescription.mobile_no}</td>
                            <td>{prescription.complain}</td>
                            <td>{prescription.Advice}</td>
                            <td>{prescription.medicine}</td>
                            <td>{prescription.notes}</td>
                            <td>{prescription.date}</td>
                            <td>
                                <button onClick={() => generatePDF(prescription)} className="btn btn-outline-primary btn-sm">
                                  Download PDF
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    </div>
    
  );
}

export default Home;