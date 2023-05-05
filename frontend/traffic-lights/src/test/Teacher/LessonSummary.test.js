import LessonSummary from "../../Components/Teacher/LessonSummary";
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('LessonSummary Component Tests', () => {
    test('should first', () => {

        const testLesson = {
            learningObjective: 'Test Objective',
            level: 'Test Level',
            classCode: 'Test Class',
            subject: 'Test Subject',
            shortId: 'testid',
            teacher: 'Test Teacher'
        }

        render(
            <MemoryRouter>
                <LessonSummary lesson={testLesson} />
            </MemoryRouter>
        )

        const LO = screen.getByText(/Test Objective/i);
        const level = screen.getByText(/Test Level/i);
        const subject = screen.getByText(/Test Subject/i);

        expect(LO).toBeInTheDocument();
        expect(level).toBeInTheDocument();
        expect(subject).toBeInTheDocument();

    })
})