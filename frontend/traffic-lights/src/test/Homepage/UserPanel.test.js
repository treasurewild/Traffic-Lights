import { MemoryRouter } from "react-router-dom";
import { render, screen } from '@testing-library/react';
import UserPanel from "../../Components/Homepage/UserPanel";

describe('UserPanel Component Tests', () => {
    test('Shows Sign In/Register buttons', () => {
        render(
            <MemoryRouter>
                <UserPanel />
            </MemoryRouter>
        );

        const signIn = screen.getByRole('button', { name: /sign in/i });
        const register = screen.getByRole('button', { name: /register/i });

        expect(signIn).toBeInTheDocument();
        expect(register).toBeInTheDocument();

    })
})