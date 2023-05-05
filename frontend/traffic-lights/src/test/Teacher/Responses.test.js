import Responses from "../../Components/Teacher/Lesson/Responses";
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Response Component Tests', () => {

    const mockResponses = [
        '1green', '2amber', '3red'
    ]
    test('should Display red amber and green responses', () => {
        render(
            <MemoryRouter>
                <Responses responses={mockResponses} />
            </MemoryRouter>
        );

        const red = screen.getByAltText('red square');
        const amber = screen.getByAltText('amber square');
        const green = screen.getByAltText('green square');

        expect(red).toBeInTheDocument();
        expect(amber).toBeInTheDocument();
        expect(green).toBeInTheDocument();

    })
})