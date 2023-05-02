import { MemoryRouter } from "react-router-dom";
import { render, screen } from '@testing-library/react';
import Homepage from '../../Components/Homepage/Homepage';

describe('Homepage Component Tests', () => {
    test('Should display Pupil Login', () => {
        render(
            <MemoryRouter>
                <Homepage />
            </MemoryRouter>
        );

        const title = screen.getByText('Pupil');
        const lessonCode = screen.getByLabelText('Lesson Code');

        expect(title).toBeInTheDocument();
        expect(lessonCode).toBeInTheDocument();
    })
})