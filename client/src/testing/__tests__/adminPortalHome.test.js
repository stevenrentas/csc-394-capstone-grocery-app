import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import Home from '../../authed/adminPortal/Home';

describe('Authorized Admin Portal Components <authed/adminPortal/Home.js>', () =>{
    
    test('renders components and makes snapshot', () => {
        const {container} = render(<Home/>);
        expect(container).toMatchSnapshot();
    });

    test('Should render Admin Home Welcome Message', () => {
        render(<Home />);
        expect(screen.getByText(/Welcome Home! You can manage users below/)).toBeInDocument;
    });

    test('Should render a "Create User" button', () => {
        const {getByText} = render( <Home /> );
        const createUserButton = getByText( "Create User" );
        expect(createUserButton).toBeInDocument;
     });


});