import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
   
    beforeEach(() => {

        const emptyForm = {
          lastName: "",
          firstName: "",
          email: "",
          birthDate: "",
          city: "",
          zipCode: "",
        };
    
        const validForm = {
          lastName: "riabi",
          firstName: "jasmine",
          email: "jasminee@gmail.com",
          birthDate: "29/07/1999",
          city: "Valbonne",
          zipCode: "06000",
        };
    
        const invalidForm = {
          lastName: "JKFHQ87",
          firstName: "é!0899=+,?",
          email: "jkfhjqkhf.dsq", 
          birthDate: "12/03/3905",
          city: "Nice",
          zipCode: "123456789", 
        };
    
        global.emptyForm = emptyForm;
        global.validForm = validForm;
        global.invalidForm = invalidForm;
        
      });
    
      afterEach(() => {
        localStorage.clear;
      })
    
    test('renders form fields', () => {
        render(<App />);
        
        const lastNameInput = screen.getByTestId('lastName');
        const firstNameInput = screen.getByTestId('firstName');
        const emailInput = screen.getByTestId('email');
        const birthDateInput = screen.getByTestId('birthDate');
        const cityInput = screen.getByTestId('city');
        const zipCodeInput = screen.getByTestId('zipCode');
    
        expect(lastNameInput).toBeInTheDocument();
        expect(firstNameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(birthDateInput).toBeInTheDocument();
        expect(cityInput).toBeInTheDocument();
        expect(zipCodeInput).toBeInTheDocument();
    });
    

  });





