import Pupil from '../../Components/Pupil/Pupil';
import { MemoryRouter } from 'react-router-dom';
import { screen, render } from '@testing-library/react';

describe('Pupil Component Tests', () => {
    test('Shows question data and connection', () => {

        const mockLesson = {
            shortId: '123',
            questions: []
        };

        render(
            <MemoryRouter>
                <Pupil isConnected={true} lesson={mockLesson} />
            </MemoryRouter>
        );

        const connected = screen.getByText(/Connected to/i);
        const questions = screen.getByText(/No questions have been asked/i);

        expect(connected).toBeInTheDocument();
        expect(questions).toBeInTheDocument();
    });
});