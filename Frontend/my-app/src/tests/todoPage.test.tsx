import { render, screen } from "@testing-library/react";
import TodoPage from "../pages/todoPage";

test('Renders correctly', () => {
    render(<TodoPage/>);
    // const todoElement = screen.getByRole('textbox');
    // expect(todoElement).toBeInTheDocument();

    // const submitButton = screen.getByRole('button');
    // expect(submitButton).toBeInTheDocument();
})