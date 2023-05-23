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

    test('Should render a "LOG IN" button', () => {
        const {getByText} = render( <Login /> );
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
        const {getByText} = render(<Login/>);
        const createUserButton = getByText("Create an account");
        expect(createUserButton).toBeInDocument;

    });
});

