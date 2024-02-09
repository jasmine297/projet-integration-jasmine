import { isFormFilled, isNameValid, isBirthDateValid, isZipCodeValid, isEmailValid } from "./module";

 let emptyForm,halfEmptyForm,filledForm, invalidForm, invalidForm2, errorText;

 beforeEach(() => {

   emptyForm = {
     lastName: "",
     firstName: "",
     email: "",
     birthDate: "",
     city: "",
     zipCode: "",
   };

   halfEmptyForm = {
     lastName: "",
     firstName: "Prenom",
     email: "",
     birthDate:"07-29-1999",
     city: "Valbonne",
     zipCode: "",
   };

   filledForm = {
     lastName: "Nom",
     firstName: "Prenom",
     email: "test@mail.fr",
     birthDate: "07-29-1999",
     city: "Valbonne",
     zipCode: "06000",
   };

   invalidForm = {
     lastName: "Nçà!?.:/èom",
     firstName: "Pre68098nom",
     email: "testmail.fr",
     birthDate: "07-29-2020",
     city: "Valbonne",
     zipCode:"0600000",
   };

   invalidForm2 = {
     lastName: "Nçà!?.:/èom",
     firstName: "Pre68098nom",
     email: "test@mailfr",
     birthDate: "07292035",
     city: "Valbonne",
     zipCode:"06P00",
   };

   errorText = {
     lastName: "",
     firstName: "",
     email: "",
     birthDate: "",
     city: "",
     zipCode: "",
   }
 });

 describe("isFormFilled Unit Test Suites", () => {

   it("should return true if the form is filled", () => {
     expect(isFormFilled(filledForm)).toEqual(true);
   });

   it("should throw an error if the form is not completly filled", () => {
     expect(() => isFormFilled(halfEmptyForm)).toThrow("form isn't filled");
   });

   it("should throw an error if the form is not filled", () => {
     expect(() => isFormFilled(emptyForm)).toThrow("form isn't filled");
   });
  

 });

 describe("isNameValid Unit Test Suites", () => {

   it("should return true if the name is valid", () => {
     expect(isNameValid(filledForm,filledForm.firstName,errorText)).toEqual(true);
   });

   it("should return true if the name is valid", () => {
     expect(isNameValid(filledForm,filledForm.lastName,errorText)).toEqual(true);
   });

   it("should throw an error if the name is invalid", () => {
     expect(() => isNameValid(invalidForm,invalidForm.lastName,errorText)).toThrow("lastname invalid");
   });

   it("should throw an error if the name is invalid", () => {
     expect(() => isNameValid(invalidForm,invalidForm.firstName,errorText)).toThrow("firstname invalid");
   });
   
 });

 describe("isBirthDateValid Unit Test Suites", () => {

   it("should return true if the birth date is valid", () => {
     expect(isBirthDateValid(filledForm,errorText)).toEqual(true);
   });

   it("should throw an error if the age no greater than 18", () => {
     expect(() => isBirthDateValid(invalidForm,errorText)).toThrow("age must be greater than 18");
   });

   it("should throw an error if the birth date is invalid", () => {
    expect(() => isBirthDateValid(invalidForm2,errorText)).toThrow("birthDate doesn't have the format allow");
   });

   it("should throw an error if the birth date is invalid", () => {
    const birthInvalid = {
      birthDate:"111-111-111"
    };
    expect(() => isBirthDateValid(birthInvalid,errorText)).toThrow("birthDate is not a date");
   });

 });

 describe("isZipCodeValid Unit Test Suites", () => {

   it("should return true if the zip code is valid", () => {
     expect(isZipCodeValid(filledForm,errorText)).toEqual(true);
   });

   it("should throw an error if the zip code is invalid", () => {
     expect(() => isZipCodeValid(invalidForm,errorText)).toThrow("zipCode must be a number and french with lenght equal ");
   });

   it("should throw an error if the zip code is invalid", () => {
     expect(() => isZipCodeValid(invalidForm2,errorText)).toThrow("zipCode must be a number and french with lenght equal ");
   });

 });

 describe("isEmailValid Unit Test Suites", () => {

   it("should return true if the email is valid", () => {
     expect(isEmailValid(filledForm,errorText)).toEqual(true);
   });

   it("should throw an error if the email is invalid", () => {
     expect(() => isEmailValid(invalidForm,errorText)).toThrow("email invalid");
   });

   it("should throw an error if the email is invalid", () => {
     expect(() => isEmailValid(invalidForm2,errorText)).toThrow("email invalid");
   });

  });