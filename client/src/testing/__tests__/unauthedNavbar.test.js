import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import AuthNavbar from '../../unauthed/navbar/UnauthedNavbar';

describe('Unauthorized Navbar Components <unauthed/navbar/UnauthedNavbar.js>', () =>{
    test('renders components and makes snapshot', () => {
        const {container} = render(<AuthNavbar/>);
        expect(container).toMatchSnapshot();
    });

    test('Should render "FOOD GPT" title', () => {
        render(<AuthNavbar />);
        expect(screen.getByText(/FOOD GPT/)).toBeInDocument;
    });
});