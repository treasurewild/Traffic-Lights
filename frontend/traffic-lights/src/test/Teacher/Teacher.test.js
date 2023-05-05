import Teacher from "../../Components/Teacher/Teacher";
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

describe('Teacher Component Tests', () => {

    const user = localStorage.setItem('user',
        JSON.stringify({
            name: 'Test User'
        }))


    test('Should say Welcome, Test User', () => {
        render(
            <MemoryRouter>
                <Teacher />
            </MemoryRouter>
        )

        const testUser = screen.getByText('Welcome, Test User');

        expect(testUser).toBeInTheDocument();
    })
})