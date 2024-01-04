import { render, screen } from "@testing-library/react";
import LoginPage from "../pages/loginPage";

test('Renders correctly', () => {
    render(<LoginPage/>);
    // const credentialElement = screen.getByRole('textbox');
    // expect(credentialElement).toBeInTheDocument();

    const submitButton = screen.getByRole('button');
    expect(submitButton).toBeInTheDocument();
})