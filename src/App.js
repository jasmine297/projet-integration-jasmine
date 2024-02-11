import "./App.css";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Alert, FormControl, Snackbar } from "@mui/material";
import { isFormFilled, isBirthDateValid, isNameValid, isEmailValid, isZipCodeValid} from "./module";

function App() {

  const [open, setOpen] = React.useState(false);
  const [alertSeverity, setAlertSeverity] = React.useState("success");
  const [alertMessage, setAlertMessage] = React.useState("Form is valid, save in localStorage.");

  const [errorState, setErrorState] = useState({
    lastName: false,
    firstName: false,
    email: false,
    birthDate: false,
    city: false,
    zipCode: false,
  });
  
  const [errorText, setErrorText] = useState({
    lastName: "",
    firstName: "",
    email: "",
    birthDate: "",
    city: "",
    zipCode: "",
  });

  const [form, setForm] = useState({
    lastName: "",
    firstName: "",
    email: "",
    birthDate: "",
    city: "",
    zipCode: "",
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const setFieldError = (fieldName, error, text) => {
    setErrorState((prevState) => ({
      ...prevState,
      [fieldName]: error, 
    }));
    setErrorText((prevState) => ({
      ...prevState,
      [fieldName]: text,  
    }));
  };
  
  // Function to validate the form
  const isFormValid = () => {
    let valid = true;
    
    //valid first name
    try {
      if (!isNameValid(form, form.firstName, errorText)) {
        setFieldError("firstName", true, errorText.firstName);
        valid = false;
        console.log(valid);
      } else {
        setFieldError("firstName", false, ""); 
      }
    } catch (error) {
      
    }
  
    //valid last name
    try {
      if (!isNameValid(form, form.lastName, errorText)) {
        setFieldError("lastName", true, errorText.lastName);
        valid = false;
        console.log(valid);
      } else {
        setFieldError("lastName", false, ""); 
      }
    } catch (error) {
      
    }
  
    //valid email
    try {
      if (!isEmailValid(form, errorText)) {
        setFieldError("email", true, errorText.email);
        valid = false;
        console.log(valid);
      } else {
        setFieldError("email", false, ""); 
      }
    } catch (error) {
      
    }
  
    //valid birth date
    try {
      if (!isBirthDateValid(form, errorText)) {
        setFieldError("birthDate", true, errorText.birthDate);
        valid = false;
        console.log(valid);
      } else {
        setFieldError("birthDate", false, ""); 
      }
    } catch (error) {
      
    }
  
    //valid zip code
    try {
      if (!isZipCodeValid(form, errorText)) {
        setFieldError("zipCode", true, errorText.zipCode);
        valid = false;
        console.log(valid);
      } else {
        setFieldError("zipCode", false, ""); 
      }
    } catch (error) {
      
    }
    
    if (errorText.birthDate !== '' || errorText.zipCode !== '' || errorText.firstName !== '' || errorText.lastName !== '' || errorText.email !== '') {
      valid = false;
    }
    
    return valid;
  };

  //check if all field are valid, and save in local storage
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (isFormValid()) {
        localStorage.setItem("userData", JSON.stringify(form));
        setForm({
          lastName: "",
          firstName: "",
          email: "",
          birthDate: "",
          city: "",
          zipCode: "",
        });
        setAlertSeverity("success");
        setAlertMessage("Form is valid, save in localStorage");
        setOpen(true);
      } else {
        setAlertSeverity("error");
        setAlertMessage("Error, form is invalid");
        setOpen(true);
        throw new Error("Error, form is invalid");
      }
    } catch (error) {
    }
  };

  const handleChange = (fieldName) => (event) => {
    setForm({
      ...form,
      [fieldName]: event.target.value,
    });

    setErrorState({
      ...errorState,
      [fieldName]: false,
    });

    setErrorText({
      ...errorText,
      [fieldName]: "",
    });
  };

  const isDisabledSubmit = () => {
    // check if form is filled for allow submit button
    try {
      if(isFormFilled(form)) return false;
      return true;
    } catch(e) {
      return true;
    }
  }

  return (
    <>
      <h1>My form</h1>
      <FormControl sx={{ m: 1, p: 1, textAlign: 'center', width: '50%' }}>
        <TextField inputProps={{ "data-testid": "lastName" }} value={form.lastName} onChange={handleChange("lastName")} error={errorText.lastName ? true : false} helperText={errorText.lastName} fullWidth sx={{ m: 2 }} required label="last name" variant="filled" />
        <TextField inputProps={{ "data-testid": "firstName" }} value={form.firstName} onChange={handleChange("firstName")} error={errorText.firstName ? true : false} helperText={errorText.firstName} fullWidth sx={{ m: 2 }} required label="first name" variant="filled" />
        <TextField inputProps={{ "data-testid": "email" }} value={form.email} onChange={handleChange("email")} error={errorText.email ? true : false} helperText={errorText.email} fullWidth type="email" sx={{ m: 2 }} required label="email" variant="filled" />
        <TextField inputProps={{ "data-testid": "birthDate" }} value={form.birthDate} onChange={handleChange("birthDate")} error={errorText.birthDate ? true : false} helperText={errorText.birthDate} fullWidth sx={{ m: 2 }} required label="birth date (format: mm-dd-yyyy)" variant="filled" />
        <TextField inputProps={{ "data-testid": "city" }} value={form.city} onChange={handleChange("city")} error={errorText.city ? true : false} helperText={errorText.city} fullWidth sx={{ m: 2 }} required label="city" variant="filled" />
        <TextField inputProps={{ "data-testid": "zipCode" }} value={form.zipCode} onChange={handleChange("zipCode")} error={errorText.zipCode ? true : false} helperText={errorText.zipCode} fullWidth sx={{ m: 2 }} required label="zip code" variant="filled" />
        <Button onClick={handleSubmit} disabled={isDisabledSubmit(form)} sx={{ backgroundColor: 'green', color: 'black', m: 2, alignSelf: 'center', width: '40%' }}>Submit</Button>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={alertSeverity}
            variant="filled"
            sx={{ width: '100%' }}
          >
           {alertMessage}
          </Alert>
        </Snackbar>
      </FormControl>
    </>
  );
}

export default App;
