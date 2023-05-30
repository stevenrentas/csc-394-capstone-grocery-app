import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import UserLogin from '../../unauthed/user/Login';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('User Login Components <Login.js>', () => {
    
    test('renders components and makes snapshot', () =>{
        const {container} = render(<UserLogin/>);
        expect(container).toMatchSnapshot();
    });

    test('Should render input box for username',() =>{
        const { container } = render(<UserLogin/>);
        const userNameInput = container.querySelector('input[name="username"]');
        expect(userNameInput).toBeInDocument;
    });

    test('Should render input box for "password"', () => {
        const { container } = render(<UserLogin/>);
        const passwordInput = container.querySelector('input[name="password"]');
        expect(passwordInput).toBeInDocument;
    });

    test('input boxes should be empty', ()=> {
        render(<UserLogin/>);
        const usernameInput = screen.getByRole("textbox");
        const passwordInput = screen.getByPlaceholderText("Password");
        expect(usernameInput.value).toBe("");
        expect(passwordInput.value).toBe("");

    });

    test('Should render a "LOG IN" button', () => {
       const {getByText} = render( <UserLogin /> );
       const loginButton = getByText( "LOG IN" );
       expect(loginButton).toBeInDocument;
    });

    test('onClick function called for "LOG IN" button', () => {
        const onClickMock = jest.fn();
        const {getByText} = render( 
            <button onClick={onClickMock}>LOG IN</button>
        );
        const button = getByText('LOG IN');
        fireEvent.click(button);
        expect(onClickMock).toHaveBeenCalled();

    });

    test ('Should render a "Create an account" button',() =>{
        const {getByText} = render(<UserLogin/>);
        const createUserButton = getByText("Create an account");
        expect(createUserButton).toBeInDocument;

    });
});
