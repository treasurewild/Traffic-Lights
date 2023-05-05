import Question from "../../Components/Pupil/Question";
import { MemoryRouter } from "react-router-dom";
import { screen, render } from "@testing-library/react";

describe('Pupil Question Component Tests', () => {
    test('Renders 3 option buttons if no answer has been given yet', () => {
        const mockQuestion = {
            text: 'Test Question',
            shortId: '123',
            responses: []
        };
        const answered = [];

        render(
            <MemoryRouter>
                <Question answered={answered} question={mockQuestion} />
            </MemoryRouter>
        );

        const testQ = screen.getByText(/test question/i);
        const testGreen = screen.getByRole('button', { name: /green/i });
        const testAmber = screen.getByRole('button', { name: /amber/i });
        const testRed = screen.getByRole('button', { name: /red/i });

        expect(testQ).toBeInTheDocument();
        expect(testGreen).toBeInTheDocument();
        expect(testAmber).toBeInTheDocument()
        expect(testRed).toBeInTheDocument();
    });

    test('Renders chosen option Red and reset button if question has been answered', () => {
        const mockQuestion = {
            text: 'Test Question',
            shortId: '123',
            responses: []
        };
        const answered = [{ shortId: '123', response: '3red' }];

        render(
            <MemoryRouter>
                <Question answered={answered} question={mockQuestion} />
            </MemoryRouter>
        );

        const testRed = screen.getByRole('button', { name: /red/i });
        const testReset = screen.getByRole('button', { name: /reset/i });

        expect(testRed).toBeInTheDocument();
        expect(testReset).toBeInTheDocument();
    });

    test('Renders chosen option Green and reset button if question has been answered', () => {
        const mockQuestion = {
            text: 'Test Question',
            shortId: '123',
            responses: []
        };
        const answered = [{ shortId: '123', response: '1green' }];

        render(
            <MemoryRouter>
                <Question answered={answered} question={mockQuestion} />
            </MemoryRouter>
        );

        const testGreen = screen.getByRole('button', { name: /green/i });
        const testReset = screen.getByRole('button', { name: /reset/i });

        expect(testGreen).toBeInTheDocument();
        expect(testReset).toBeInTheDocument();
    });

    test('Renders chosen option Amber and reset button if question has been answered', () => {
        const mockQuestion = {
            text: 'Test Question',
            shortId: '123',
            responses: []
        };
        const answered = [{ shortId: '123', response: '2amber' }];

        render(
            <MemoryRouter>
                <Question answered={answered} question={mockQuestion} />
            </MemoryRouter>
        );

        const testAmber = screen.getByRole('button', { name: /amber/i });
        const testReset = screen.getByRole('button', { name: /reset/i });

        expect(testAmber).toBeInTheDocument();
        expect(testReset).toBeInTheDocument();
    });
});