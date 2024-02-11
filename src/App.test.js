import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";

let errorSpy;

beforeEach(() => {
  errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  errorSpy.mockRestore();
  localStorage.clear();
});

describe("App component", () => {
  test("renders form fields", () => {
    render(<App />);

    const lastNameTextField = screen.getByTestId("lastName");
    const firstNameTextField = screen.getByTestId("firstName");
    const emailTextField = screen.getByTestId("email");
    const birthDateTextField = screen.getByTestId("birthDate");
    const cityTextField = screen.getByTestId("city");
    const zipCodeTextField = screen.getByTestId("zipCode");

    expect(lastNameTextField).toBeInTheDocument();
    expect(firstNameTextField).toBeInTheDocument();
    expect(emailTextField).toBeInTheDocument();
    expect(birthDateTextField).toBeInTheDocument();
    expect(cityTextField).toBeInTheDocument();
    expect(zipCodeTextField).toBeInTheDocument();
  });

  test("disables submit button when form is not filled", () => {
    render(<App />);
    const submitButton = screen.getByRole("button", { name: /submit/i });
    expect(submitButton).toBeDisabled();
  });

  test("allow submit button when form is filled", () => {
    render(<App />);

    const lastNameTextField = screen.getByTestId("lastName");
    const firstNameTextField = screen.getByTestId("firstName");
    const emailTextField = screen.getByTestId("email");
    const birthDateTextField = screen.getByTestId("birthDate");
    const cityTextField = screen.getByTestId("city");
    const zipCodeTextField = screen.getByTestId("zipCode");
    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.change(lastNameTextField, { target: { value: "Riabi" } });
    fireEvent.change(firstNameTextField, { target: { value: "Jasmine" } });
    fireEvent.change(emailTextField, { target: { value: "jasmine@mail.com" } });
    fireEvent.change(birthDateTextField, { target: { value: "29-07-1999" } });
    fireEvent.change(cityTextField, { target: { value: "Nice" } });
    fireEvent.change(zipCodeTextField, { target: { value: "06000" } });

    expect(submitButton).not.toBeDisabled();
  });

  test("display error toast when form is invalid", async () => {
    render(<App />);
    const lastNameTextField = screen.getByTestId("lastName");
    const firstNameTextField = screen.getByTestId("firstName");
    const emailTextField = screen.getByTestId("email");
    const birthDateTextField = screen.getByTestId("birthDate");
    const cityTextField = screen.getByTestId("city");
    const zipCodeTextField = screen.getByTestId("zipCode");
    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.change(lastNameTextField, { target: { value: "Ri$3)2abi" } });
    fireEvent.change(firstNameTextField, { target: { value: "Jas<)=3mine" } });
    fireEvent.change(emailTextField, { target: { value: "jasminemail.com" } });
    fireEvent.change(birthDateTextField, { target: { value: "29-07-2030" } });
    fireEvent.change(cityTextField, { target: { value: "Nice" } });
    fireEvent.change(zipCodeTextField, { target: { value: "06P000" } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText(/Error, form is invalid/i)).toBeInTheDocument();
      expect(localStorage.getItem("userData")).toBeNull();
    });
  });

  test("display success toast and clear form when form is valid", async () => {
    render(<App />);
    const lastNameTextField = screen.getByTestId("lastName");
    const firstNameTextField = screen.getByTestId("firstName");
    const emailTextField = screen.getByTestId("email");
    const birthDateTextField = screen.getByTestId("birthDate");
    const cityTextField = screen.getByTestId("city");
    const zipCodeTextField = screen.getByTestId("zipCode");
    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.change(lastNameTextField, { target: { value: "Doe" } });
    fireEvent.change(firstNameTextField, { target: { value: "John" } });
    fireEvent.change(emailTextField, { target: { value: "john.doe@example.com" } });
    fireEvent.change(birthDateTextField, { target: { value: "05-20-1988" } });
    fireEvent.change(cityTextField, { target: { value: "New York" } });
    fireEvent.change(zipCodeTextField, { target: { value: "10001" } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText(/Form is valid, save in localStorage/i)).toBeInTheDocument();
      expect(localStorage.getItem("userData")).not.toBeNull();
      expect(lastNameTextField.value).toBe("");
      expect(firstNameTextField.value).toBe("");
      expect(emailTextField.value).toBe("");
      expect(birthDateTextField.value).toBe("");
      expect(cityTextField.value).toBe("");
      expect(zipCodeTextField.value).toBe("");
    });
  });

  test("display error red and helperText when form is invalid 1", async () => {
    render(<App />);
    const lastNameTextField = screen.getByTestId("lastName");
    const firstNameTextField = screen.getByTestId("firstName");
    const emailTextField = screen.getByTestId("email");
    const birthDateTextField = screen.getByTestId("birthDate");
    const cityTextField = screen.getByTestId("city");
    const zipCodeTextField = screen.getByTestId("zipCode");
    const submitButton = screen.getByRole("button", { name: /submit/i });
    
    // Remplir le formulaire avec des données invalides
    fireEvent.change(lastNameTextField, { target: { value: "Ri$3)2abi" } });
    fireEvent.change(firstNameTextField, { target: { value: "Jas<)=3mine" } });
    fireEvent.change(emailTextField, { target: { value: "jasminemail.com" } });
    fireEvent.change(birthDateTextField, { target: { value: "07-29-2010" } });
    fireEvent.change(cityTextField, { target: { value: "Nice" } });
    fireEvent.change(zipCodeTextField, { target: { value: "06P000" } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText("firstname invalid")).toHaveStyle("color: #D32F2F");
      expect(screen.getByText("lastname invalid")).toHaveStyle("color: #D32F2F");
      expect(screen.getByText("email invalid")).toHaveStyle("color: #D32F2F");
      expect(screen.getByText("age must be greater than 18")).toHaveStyle("color: #D32F2F");
      expect(screen.getByText("zipCode must be a number and french with length equal 5")).toHaveStyle("color: #D32F2F");
    });
  });

  test("display error red and helperText when form is invalid 2", async () => {
    render(<App />);
    const lastNameTextField = screen.getByTestId("lastName");
    const firstNameTextField = screen.getByTestId("firstName");
    const emailTextField = screen.getByTestId("email");
    const birthDateTextField = screen.getByTestId("birthDate");
    const cityTextField = screen.getByTestId("city");
    const zipCodeTextField = screen.getByTestId("zipCode");
    const submitButton = screen.getByRole("button", { name: /submit/i });
    
    // Remplir le formulaire avec des données invalides
    fireEvent.change(lastNameTextField, { target: { value: "Ri$3)2abi" } });
    fireEvent.change(firstNameTextField, { target: { value: "Jas<)=3mine" } });
    fireEvent.change(emailTextField, { target: { value: "jasmin@emailcom" } });
    fireEvent.change(birthDateTextField, { target: { value: "29072030" } });
    fireEvent.change(cityTextField, { target: { value: "Nice" } });
    fireEvent.change(zipCodeTextField, { target: { value: "0650932000" } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText("firstname invalid")).toHaveStyle("color: #D32F2F");
      expect(screen.getByText("lastname invalid")).toHaveStyle("color: #D32F2F");
      expect(screen.getByText("email invalid")).toHaveStyle("color: #D32F2F");
      expect(screen.getByText("birthDate is not a date")).toHaveStyle("color: #D32F2F");
      expect(screen.getByText("zipCode must be a number and french with length equal 5")).toHaveStyle("color: #D32F2F");
    });
  });

  

});

