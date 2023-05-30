import React from 'react';
import {render, fireEvent, screen, getByPlaceholderText} from '@testing-library/react';
import SignUp from '../../unauthed/user/SignUp';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('User Signup Components <Signup.js>', () => {
    
   
    test('renders components and makes snapshot', () =>{
        const {container} = render(<SignUp/>);
        expect(container).toMatchSnapshot();
    });

    test('Should render input box for "First name"', () => {
        const { container } = render(<SignUp/>);
        const firstNameInput = container.querySelector('input[name="firstname"]');
        expect(firstNameInput).toBeInDocument;
    });

    test('Should render input box for "Last name"', () => {
        const { container } = render(<SignUp/>);
        const lastNameInput = container.querySelector('input[name="lastname"]');
        expect(lastNameInput).toBeInDocument;
    });

    test('Should render input box for "username"', () => {
        const { container } = render(<SignUp/>);
        const usernameInput = container.querySelector('input[name="username"]');
        expect(usernameInput).toBeInDocument;
    });
    
    test('Should render input box for "email"', () => {
        const { container } = render(<SignUp/>);
        const emailInput = container.querySelector('input[name="emailAddress"]');
        expect(emailInput).toBeInDocument;
    });

    test('Should render input box for "password"', () => {
        const { container } = render(<SignUp/>);
        const passwordInput = container.querySelector('input[name="password"]');
        expect(passwordInput).toBeInDocument;
    });

    test('Should render input box for "varify password"', () => {
        const { container } = render(<SignUp/>);
        const confirmPassInput = container.querySelector('input[name="confirmPassword"]');
        expect(confirmPassInput).toBeInDocument;
    });

    test('input boxes should be empty', ()=> {
        render(<SignUp/>);
        const firstnameInput = screen.getByPlaceholderText("First Name")
        const lastnameInput = screen.getByPlaceholderText("Last Name");
        const usernameInput = screen.getByPlaceholderText("Username");
        const emailInput = screen.getByPlaceholderText("Email Address");
        const passwordInput = screen.getByPlaceholderText("Password");
        const verifyInput = screen.getByPlaceholderText("Verify Password");

        expect(firstnameInput.value).toBe("");
        expect(lastnameInput.value).toBe("");
        expect(usernameInput.value).toBe("");
        expect(emailInput.value).toBe("");
        expect(passwordInput.value).toBe("");
        expect(verifyInput.value).toBe("");

    });

    test ('Should render a "Create account" button',() =>{
        const {getByText} = render(<SignUp/>);
        const createAccountButton = getByText("CREATE ACCOUNT");
        expect(createAccountButton).toBeInDocument;

    });

    test('onClick function called for "CREATE ACCOUNT" buton', () => {
        const onClickMock = jest.fn();
        const {getByText} = render( 
            <button onClick={onClickMock}>CREATE ACCOUNT</button>
        );
        const button = getByText('CREATE ACCOUNT');
        fireEvent.click(button);
        expect(onClickMock).toHaveBeenCalled();
    });

    test ('Should render a "Already a member?" button',() =>{
        const {getByText} = render(<SignUp/>);
        const alreadyMemButton = getByText("Already a member?");
        expect(alreadyMemButton).toBeInDocument;

    });

});
