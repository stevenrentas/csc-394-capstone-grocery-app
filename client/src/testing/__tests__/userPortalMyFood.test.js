import React from 'react';
import {render, screen} from '@testing-library/react';
import { UserContext, UserProvider}  from '../../contexts/UserContext';
import MyFood from '../../authed/userPortal/MyFood';



describe('Authorized User Portal, "MyFood" Components <authed/userPortal/MyFood.js>',() => {
   
    const mockContextValue = {
        showModal: false,
        setShowModal: jest.fn(),
        recipes: [],
        setRecipes: jest.fn(),
        food: [],
        setFood: jest.fn(),
        columns: [],
        ingredients: [],
        setIngredients: jest.fn(),
        foodPref: [],
        setFoodPref: jest.fn(),
      };
   
    test ('renders components and makes shapshot', () => {
        const {container } = render(
        <UserContext.Provider value={mockContextValue}>
            <MyFood />
        </UserContext.Provider>) 
        expect(container).toMatchSnapshot();
    })  

    test('Should render a "Add Food" button', () => {
        render(
            <UserContext.Provider value = {mockContextValue}>
                <MyFood />
            </UserContext.Provider>
        )
        expect((screen.getByText('Add Food')).toBeInDocument);
    })
});