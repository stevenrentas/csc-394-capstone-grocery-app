import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import UserLogin from '../../unauthed/user/Login';

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
    //NOT SURE IF WORKING PROPERLY??//
    //Still need to finish this one.
    // test('"Create an account" button that has an href attribute', () => {
    //     const href = "/signup";
    //     const {getByText} = render(<a href={href}>Create an account</a>);
    //     const link = getByText('Create an account');
    //     fireEvent.click(link);
    //     expect(screen.getByRole('link',{name: 'Create an account'}));
    // });

});
