export function isFormFilled(form) {
  if (
    form.lastName !== "" &&
    form.firstName !== "" &&
    form.email !== "" &&
    form.birthDate !== "" &&
    form.city !== "" &&
    form.zipCode !== ""
  ) {
    return true;
  } else {
    throw new Error("form isn't filled");
  }
}

export function isNameValid(form, name, errorText) {
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ'\- ]+$/;

    if (name.match(nameRegex)) {
      return true;
    } else {
      if (name === form.firstName) {
        errorText.firstName = "firstname invalid";
        throw new Error("firstname invalid");
      }
      if (name === form.lastName) {
        errorText.lastName = "lastname invalid";
        throw new Error("lastname invalid");
      }
    }
  
}

export function isBirthDateValid(form, errorText) {
  if (!(form.birthDate instanceof Date)) {
    const [month, day, year] = form.birthDate.split("-");
    if(!(month && day && year)) {
        errorText.birthDate = "birthDate doesn't have the format allow";
        throw new Error("birthDate doesn't have the format allow");
    }else{
      form.birthDate = new Date(`${year}-${month}-${day}`);
      if (!(form.birthDate instanceof Date)) {
          errorText.birthDate = "birthDate is not a date";
          throw new Error("birthDate is not a date");
      }
    }
    
  }
  let dateDiff = new Date(Date.now() - form.birthDate.getTime());
  let age = Math.abs(dateDiff.getUTCFullYear() - 1970);
  if (age < 18) {
    errorText.birthDate = "age must be greater than 18";
    throw new Error("age must be greater than 18");
  }
  return age >= 18;
}

export function isZipCodeValid(form, errorText) {
    if (form.zipCode.length !== 5 || !/^\d+$/.test(form.zipCode)) {
        errorText.zipCode = "zipCode must be a number and french with lenght equal 5";
        throw new Error( "zipCode must be a number and french with lenght equal 5");
    }
    return true;
}

export function isEmailValid(form, errorText) {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (form.email.match(emailRegex)) {
        return true;
    } else {
        errorText.email = "email invalid";
        throw new Error("email invalid");
    }
}
