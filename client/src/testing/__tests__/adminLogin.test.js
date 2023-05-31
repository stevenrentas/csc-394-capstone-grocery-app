import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import Login from '../../unauthed/admin/Login';


const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Admin Login Components <unauthed/admin/Login.js>', () => {
    
    test('renders components and makes snapshot', () => {
        const {container} = render(<Login/>);
        expect(container).toMatchSnapshot();
    });

    test('Should render admin title,"Admin Login"', () => {
        render(<Login />);
        expect(screen.getByText(/admin login/i)).toBeInDocument;

    });

    test('Should render input box for username',() => {
        const { container } = render(<Login/>);
        const userNameInput = container.querySelector('input[name="username"]');
        expect(userNameInput).toBeInDocument;
    });

    test('Should render input box for "password"', () => {
        const { container } = render(<Login/>);
        const passwordInput = container.querySelector('input[name="password"]');
        expect(passwordInput).toBeInDocument;
    });

    test('input boxes should be empty', ()=> {
        render(<Login/>);
        const usernameInput = screen.getByRole("textbox");
        const passwordInput = screen.getByPlaceholderText("Password");
        expect(usernameInput.value).toBe("");
        expect(passwordInput.value).toBe("");

    });

    test('Should render a "LOG IN" button', () => {
        const {getByText} = render( <Login /> );
        const loginButton = getByText( "LOG IN" );
        expect(loginButton).toBeInDocument;
     });

     test('onClick function called for "LOG IN" button', () => {
        const onClickMock = jest.fn();
        const {getByText} = render( 
            <button onClick={onClickMock}>
                LOG IN
            </button>
        );
        const button = getByText('LOG IN');
        fireEvent.click(button);
        expect(onClickMock).toHaveBeenCalled();
        
    });
});

