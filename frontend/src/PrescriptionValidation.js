function Validation(values)
{
    let error = {}
    const mobileno_pattern = /^(\+91\s?)?[6-9]\d{9}$/

    if(values.DoctorName === ""){
        error.DoctorName = "Name should not be empty"
    }
    else{
        error.DoctorName = ""
    }

    if(values.qualification === ""){
        error.qualification = "Qualification should not be empty"
    }
    else{
        error.qualification = ""
    }

    if(values.name === ""){
        error.name = "Name should not be empty"
    }
    else{
        error.name = ""
    }

    if(values.age === ""){
        error.age = "Age should not be empty"
    }
    else{
        error.age = ""
    }

    if(values.gender === ""){
        error.gender= "Gender should not be empty"
    }
    else{
        error.gender = ""
    }

    if(values.patient_mobile === ""){
        error.patient_mobile = "Mobile Number should not be empty"
    }
    else if(!mobileno_pattern.test(values.patient_mobile)){
        error.patient_mobile = "Enter correct Mobile Number."
    }
    else{
        error.patient_mobile = ""
    }

    if(values.patient_address === ""){
        error.patient_address = "Address should not be empty"
    }
    else{
        error.patient_address = ""
    }

    if(values.complain === ""){
        error.complain = "Complain should not be empty"
    }
    else{
        error.complain = ""
    }

    if(values.advice === ""){
        error.advice = "This can't be empty"
    }
    else{
        error.advice = ""
    }

    if(values.medicine === ""){
        error.medicine = "Prescribe some medicine"
    }
    else{
        error.medicine = ""
    }

    if(values.notes === ""){
        error.notes = "This can't be empty"
    }
    else{
        error.notes = ""
    }

    return error;
}

export default Validation