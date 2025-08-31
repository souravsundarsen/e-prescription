const express = require("express");
const mysql = require("mysql");
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cors());


const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "eprescrip"
    }
);


// For Sign Up (registration)
app.post('/signup',(req, res) => {

    const sql = "INSERT INTO signup (`name`, `gender`, `qualification`, `registration_no`, `email`, `password`, `mobile`, `address`, `hospital_name`, `other`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.gender,
        req.body.qualification,
        req.body.registrationno,
        req.body.email,
        req.body.password,
        req.body.mobileno,
        req.body.address,
        req.body.hospital,
        req.body.otherdetails
    ]
    db.query(sql, [values], (err, data) => {
        if(err){
           // return res.json("Database Error");
           return res.status(500).json({ error: "Database Error" });
        }
        //return res.json(data);
        return res.json({ message: "Signup successful", data });
    })
})

// For Log In
app.post('/login',(req, res) => {

    const { email, password } = req.body;

    const sql = "SELECT * FROM signup WHERE email = ? AND password = ? ";

    db.query(sql, [email, password], (err, data) => {
        if(err){
            //return res.json("Error");
            return res.status(500).json({ error: "Database error" });
        }
        if(data.length > 0){
            //return res.json("Success");
            //const userName = data[0].name;
            const user = data[0];

            return res.json({
                success: true, 
               // name:userName,
               // token:"dummy-token", //it is optional but in future if we work with token then will use it
               doctor:{
                id:user.id,
                name:user.name,
                qualification:user.qualification,
                registration_no:user.registration_no,
                address:user.address
               },
               token:"dummy-token"
            });
        }
        else{
            res.status(401).json({ error: "Invalid credentials" });
        }
    })
})

// Prescription API
app.post("/prescription", (req, res) => {
    const {
        date,
        name,
        age,
        gender,
        patient_mobile,
        patient_address,
        complain,
        advice,
        medicine,
        notes,
        doctor_id,
        doctor_name,
        doctor_degree,
        doctor_address,
        doctor_registrationno,
    } = req.body;
    
  
    const sql = "INSERT INTO prescription  (date, name, age, gender, mobile_no, address, complain, advice, medicine, notes,  doctor_id, doctor_name, doctor_degree, doctor_address, doctor_registrationno) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  
    const values = [
      date,
      name,
      age,
      gender,
      patient_mobile,
      patient_address,
      complain,
      advice,
      medicine,
      notes,
      doctor_id,
      doctor_name,
      doctor_degree,
      doctor_address,
      doctor_registrationno,
    ];
  
    db.query(sql, values, (err, data) => {
      if (err) {
        console.error("Insert error:", err);
        return res.status(500).json({ success: false });
      }
      //return res.json({ success: true });
      return res.json({ message: "Prescription saved successfully", data });
    });
  });
  
// To get the list of prescription
app.get('/prescriptions/:doctorId',(req, res) =>{
    const doctorId = req.params.doctorId;
    const sql = "SELECT * FROM prescription WHERE doctor_id = ?";
    db.query(sql, [doctorId], (err,data) => {
        if(err){
            console.error("Error fetching prescriptions: ", err);
            return res.status(500).json({error:"Failed to fetch prescriptions"});
        }
        return res.json(data);
    })
})

app.listen(8081, ()=> {
    console.log("Server running on port 8081");
})