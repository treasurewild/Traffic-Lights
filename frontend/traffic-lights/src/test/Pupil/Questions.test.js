import Questions from '../../Components/Pupil/Questions';
import { MemoryRouter } from "react-router-dom";
import { render, screen } from '@testing-library/react';

describe('Pupil Questions Component Tests', () => {

    it('Shows correct text for no questions', () => {

        const noMockQuestions = [];

        render(
            <MemoryRouter>
                <Questions questions={noMockQuestions} />
            </MemoryRouter>
        );

        const initialText = screen.getByText('No questions have been asked.');

        expect(initialText).toBeInTheDocument();

    });

    it('Shows questions and togglebutton if questions have been asked', () => {

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
                <Questions questions={mockQuestions} />
            </MemoryRouter>
        );

        const testQ1 = screen.getByText('Test 1');
        const testQ2 = screen.getByText('Test 2');

        expect(testQ1).toBeInTheDocument();
        expect(testQ2).toBeInTheDocument();

    });

})