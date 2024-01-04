import { render, screen, cleanup } from "@testing-library/react";
import MyList from "../components/myList";

test('MyList component render correctly', () => {
    const mockTodo = {
        id: 1,
        description: 'Test todo',
        flag: false
    };

    const mockRemoveTodo = (id: number) => {
        console.log(`Remove todo with id ${id}`);
    };

    const mockDoneTodo = (id: number) => {
        console.log(`Done todo with id ${id}`);
    };

    render(<MyList todo={mockTodo} onRemoveTodo={mockRemoveTodo} onDoneTodo={mockDoneTodo} />)
    const todoElement = screen.getByTestId('todo-1');
    expect(todoElement).toBeInTheDocument();
});

