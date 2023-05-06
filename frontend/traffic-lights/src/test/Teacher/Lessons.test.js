import Lessons from '../../Components/Teacher/Lessons';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { mockLessonsLarge, mockLessonsSmall } from '../mockLessons';

describe('Lessons Component Tests', () => {

    test('should display Show All button for > 10 lessons', () => {
        render(
            <MemoryRouter>
                <Lessons lessons={mockLessonsLarge} />
            </MemoryRouter>
        )

        const showAllButton = screen.getByText('Show All');

        const LO = screen.getAllByText(/Objective/i);
        const level = screen.getAllByText(/Level/i);
        const subject = screen.getAllByText(/Subject/i);

        expect(LO.length).toBe(10);
        expect(level.length).toBe(10);
        expect(subject.length).toBe(10);

        expect(showAllButton).toBeInTheDocument();
    });

    test('should display all lessons when Show All button is clicked', () => {
        let showAll = true;

        render(
            <MemoryRouter>
                <Lessons lessons={mockLessonsLarge} showAll={showAll} />
            </MemoryRouter>
        )

        const LO = screen.getAllByText(/Objective/i);
        const level = screen.getAllByText(/Level/i);
        const subject = screen.getAllByText(/Subject/i);

        expect(LO.length).toBe(12);
        expect(level.length).toBe(12);
        expect(subject.length).toBe(12);
    });
})