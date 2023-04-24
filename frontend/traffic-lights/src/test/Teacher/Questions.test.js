import Teacher from '../../Components/Teacher/Teacher';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Teacher Questions Component Tests', () => {

    it('Shows correct text for no questions', () => {

        const noMockQuestions = [];

        render(
            <MemoryRouter>
                <Teacher questions={noMockQuestions} />
            </MemoryRouter>
        );

        const initialText = screen.getByText('No questions have been asked.');

        expect(initialText).toBeInTheDocument();

    });

    it('Shows correct text when there are questions', () => {

        const mockQuestions = [
            {
                text: 'Test 1',
                _id: '123'
            },
            {
                text: 'Test 2',
                _id: '456'
            }
        ];
        render(
            <MemoryRouter>
                <Teacher questions={mockQuestions} />
            </MemoryRouter>
        );

        const testQ1 = screen.getByText('Test 1');
        const testQ2 = screen.getByText('Test 2');

        expect(testQ1).toBeInTheDocument();
        expect(testQ2).toBeInTheDocument();

    });
});