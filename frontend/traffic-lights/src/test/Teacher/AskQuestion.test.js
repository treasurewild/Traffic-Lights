import AskQuestion from "../../Components/Teacher/Lesson/AskQuestion";
import { MemoryRouter } from "react-router-dom";
import { screen, render } from "@testing-library/react";

describe('AskQuestion Component Tests', () => {
    test('Should display form for question', () => {
        render(
            <MemoryRouter>
                <AskQuestion />
            </MemoryRouter>
        );

        const question = screen.getByLabelText('Question');

        expect(question).toBeTruthy();
    })
})