import Questions from '../../Components/Teacher/Lesson/Questions';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Teacher Questions Component Tests', () => {

    it('Shows correct text for no questions', () => {

        const mockLesson = {
            learningObjective: 'Test',
            subject: 'Test',
            level: 'Test',
            _id: '11111111111111111111',
            shortId: '111111',
            questions: []
        }

        render(
            <MemoryRouter>
                <Questions lesson={mockLesson} />
            </MemoryRouter>
        );

        const initialText = screen.getByText('No questions have been asked.');

        expect(initialText).toBeInTheDocument();

    });

    it('Shows correct text when there are questions', () => {

        const mockLesson = {
            learningObjective: 'Test',
            subject: 'Test',
            level: 'Test',
            _id: '11111111111111111111',
            shortId: '111111',
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
            ]
        }

        render(
            <MemoryRouter>
                <Questions lesson={mockLesson} />
            </MemoryRouter>
        );

        const testQ1 = screen.getByText('Test 1');
        const testQ2 = screen.getByText('Test 2');

        expect(testQ1).toBeInTheDocument();
        expect(testQ2).toBeInTheDocument();

    });
});