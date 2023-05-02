import { MemoryRouter } from "react-router-dom";
import { render, screen } from '@testing-library/react';
import SignIn from "../../Components/Homepage/SignIn";

describe('SignIn Component Tests', () => {
    test('Should show email and password fields', () => {
        render(
            <MemoryRouter>
                <SignIn />
            </MemoryRouter>
        );

        const email = screen.getByPlaceholderText(/email/i);
        const password = screen.getByPlaceholderText(/password/i);

        expect(email).toBeInTheDocument();
        expect(password).toBeInTheDocument();
    })
})