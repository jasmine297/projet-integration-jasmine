/**
 * Check if all fields in the form are filled.
 * @param {object} form - The form object containing fields to check.
 * @throws {Error} Throws an error if any required field is empty.
 * @returns {boolean} Returns true if all fields are filled.
 */
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

/**
 * Validate a first name or last name field.
 * @param {object} form - The form object containing the field.
 * @param {string} name - The name to validate (firstName or lastName).
 * @param {object} errorText - The object to store error messages.
 * @throws {Error} Throws an error if the firstName or lastName is invalid.
 * @returns {boolean} Returns true if the firstName or lastName is valid.
 */
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

/**
 * Validate a birth date field.
 * @param {object} form - The form object containing the field.
 * @param {object} errorText - The object to store error messages.
 * @throws {Error} Throws an error if the birth date is not a date or age is smaller than 18.
 * @returns {boolean} Returns true if the birth date is valid and age is greater than or equal to 18.
 */
export function isBirthDateValid(form, errorText) {

  if (!(form.birthDate instanceof Date)) {
    const dateRegex = /^(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])-(19|20)\d{2}$/;
    if(!(form.birthDate.match(dateRegex) !== null)) {
        errorText.birthDate = "birthDate is not a date";
        throw new Error("birthDate is not a date");
    }
  }
  
  const [month, day, year] = form.birthDate.split("-");
  form.birthDate = new Date(`${year}-${month}-${day}`);
  let dateDiff = new Date(Date.now() - form.birthDate.getTime());
  let age = Math.abs(dateDiff.getUTCFullYear() - 1970);
  if (age < 18) {
    errorText.birthDate = "age must be greater than 18";
    throw new Error("age must be greater than 18");
  }
  return age >= 18;
}

/**
 * Validate a zip code field.
 * @param {object} form - The form object containing the field.
 * @param {object} errorText - The object to store error messages.
 * @throws {Error} Throws an error if the zip code is not or/and length not equal 5.
 * @returns {boolean} Returns true if the zip code is valid.
 */
export function isZipCodeValid(form, errorText) {
    if (form.zipCode.length !== 5 || !/^\d+$/.test(form.zipCode)) {
        errorText.zipCode = "zipCode must be a number and french with length equal 5";
        throw new Error( "zipCode must be a number and french with length equal 5");
    }
    return true;
}

/**
 * Validate an email field.
 * @param {object} form - The form object containing the field.
 * @param {object} errorText - The object to store error messages.
 * @throws {Error} Throws an error if the email is invalid.
 * @returns {boolean} Returns true if the email is valid.
 */
export function isEmailValid(form, errorText) {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (form.email.match(emailRegex)) {
        return true;
    } else {
        errorText.email = "email invalid";
        throw new Error("email invalid");
    }
}
