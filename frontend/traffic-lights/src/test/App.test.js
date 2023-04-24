import { MemoryRouter } from "react-router-dom";
import App from "../App";
import { render, screen } from '@testing-library/react';

describe('App Component Tests', () => {
    test('Should say "Welcome to Traffic Lights"', async () => {
        render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        );

        expect(await screen.findByText("Welcome to Traffic Lights")).toBeInTheDocument();
    })
})