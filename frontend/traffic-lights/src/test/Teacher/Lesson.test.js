import Lesson from "../../Components/Teacher/Lesson/Lesson";
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

describe('Lesson Component Tests', () => {

    const mockLesson = {
        learningObjective: 'Objective 1',
        subject: 'Subject 1',
        level: 'Level 1',
        classCode: 'Class 1',
        questions: [
            {
                text: 'Test 1',
                shortId: '111111',
                responses: [],
                _id: '111'
            },
            {
                text: 'Test 2',
                shortId: '222222',
                responses: [],
                _id: '222'
            }
        ],
        shortId: '111111',
        _id: '111111111111111l',
        teacher: '111111111111111t'
    }

    test('Should show Back to Lessons, Copy Code buttons', () => {
        render(
            <MemoryRouter>
                <Lesson lesson={mockLesson} />
            </MemoryRouter>
        )

        const back = screen.getByText(/Back to Lessons/i);
        const copy = screen.getByText(/Copy Code/i);

        expect(back).toBeInTheDocument();
        expect(copy).toBeInTheDocument();

    });

    test('should display Lesson Data', () => {

        render(
            <MemoryRouter>
                <Lesson lesson={mockLesson} />
            </MemoryRouter>
        );

        const LO = screen.getByText(/Learning Objective: Objective 1/i);
        const details = screen.getByText(/Subject 1/i);
        const refresh = screen.getByText(/Refresh Lesson Data/i);

        expect(LO).toBeInTheDocument();
        expect(details).toBeInTheDocument();
        expect(refresh).toBeInTheDocument();

    });

    test('should Display Questions', () => {

        render(
            <MemoryRouter>
                <Lesson lesson={mockLesson} />
            </MemoryRouter>
        );

        const test1 = screen.getByText(/Test 1/i);
        const test2 = screen.getByText(/Test 2/i);

        expect(test1).toBeInTheDocument();
        expect(test2).toBeInTheDocument();
    })
})