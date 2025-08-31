function Validation(values)
{
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}$/
    const mobileno_pattern = /^(\+91\s?)?[6-9]\d{9}$/
    //const mobileno_pattern = /^[0-9]{10}$/

    if(values.name === ""){
        error.name = "Name should not be empty"
    }
    else{
        error.name = ""
    }

    if(values.gender === ""){
        error.gender= "Gender should not be empty"
    }
    else{
        error.gender = ""
    }

    if(values.qualification === ""){
        error.qualification = "Qualification should not be empty"
    }
    else{
        error.qualification = ""
    }

    if(values.registrationno === ""){
        error.registrationno = "Registration No. should not be empty"
    }
    else{
        error.registrationno = ""
    }

    if(values.email === ""){
        error.email = "Email should not be empty"
    }
    else if(!email_pattern.test(values.email)){
        error.email = "Enter correct Email ID"
    }
    else{
        error.email = ""
    }

    if(values.password === ""){
        error.password = "Password should not be empty"
    }
    else if(!password_pattern.test(values.password)){
        error.password = "Password didn't match (atleast one lowercase & uppercase and minimum of 6 character)."
    }
    else{
        error.password = ""
    }

    if(values.mobileno === ""){
        error.mobileno = "Mobile Number should not be empty"
    }
    else if(!mobileno_pattern.test(values.mobileno)){
        error.mobileno = "Enter correct Mobile Number."
    }
    else{
        error.mobileno = ""
    }

    if(values.address === ""){
        error.address = "Address should not be empty"
    }
    else{
        error.address = ""
    }

    if(values.hospital === ""){
        error.hospital = "Hospital Name should not be empty"
    }
    else{
        error.hospital = ""
    }

    if(values.otherdetails === ""){
        error.otherdetails = "This can't be empty"
    }
    else{
        error.otherdetails = ""
    }

    return error;
}

export default Validation