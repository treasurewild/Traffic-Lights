import NewLesson from "../../Components/Teacher/NewLesson";
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

describe('NewLesson Component Tests', () => {
    test('Should display Learning Objective, Subject, Level and Class inputs', () => {
        render(
            <MemoryRouter>
                <NewLesson />
            </MemoryRouter>
        )

        const LO = screen.findByPlaceholderText('Learning Objective');
        const subject = screen.findByPlaceholderText('Subject');
        const level = screen.findByPlaceholderText('Level');
        const classCode = screen.findByPlaceholderText('Class');

        expect(LO).toBeTruthy();
        expect(subject).toBeTruthy();
        expect(level).toBeTruthy();
        expect(classCode).toBeTruthy();

    })
})