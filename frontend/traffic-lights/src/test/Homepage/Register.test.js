import { MemoryRouter } from "react-router-dom";
import { render, screen } from '@testing-library/react';
import Register from "../../Components/Homepage/Register";

describe('Register Component Tests', () => {

    test('Shows name/email/password form', () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        const name = screen.getByPlaceholderText(/name/i);
        const email = screen.getByPlaceholderText(/email/i);
        const password = screen.getByPlaceholderText(/password/i);

        expect(name).toBeInTheDocument();
        expect(email).toBeInTheDocument();
        expect(password).toBeInTheDocument();

    })
})