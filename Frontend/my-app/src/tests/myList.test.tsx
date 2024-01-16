import { render, fireEvent } from "@testing-library/react";
import MyList from "../components/myList";
import renderer from "react-test-renderer";

describe("MyList component", () => {
  test("render the MyList component", () => {
    const mockOnRemoveTodo = jest.fn();
    const mockOnDoneTodo = jest.fn();

    const todo = {
      id: 1,
      description: "Test Todo",
      flag: false,
    };

    const { getByText } = render(
      <MyList
        todo={todo}
        onRemoveTodo={mockOnRemoveTodo}
        onDoneTodo={mockOnDoneTodo}
      />
    );

    fireEvent.click(getByText("Done"));
    expect(mockOnDoneTodo).toHaveBeenCalledWith(todo.id);

    fireEvent.click(getByText("Delete"));
    expect(mockOnRemoveTodo).toHaveBeenCalledWith(todo.id);
  });  

  test("should call onDoneTodo when the done button is clicked", () => {
    const todo = { id: 1, description: 'Test todo', flag: false };
    const onRemoveTodo = jest.fn();
    const onDoneTodo = jest.fn();

    const { getByText } = render(
      <MyList todo={todo} onRemoveTodo={onRemoveTodo} onDoneTodo={onDoneTodo} />
    );
    const doneButton = getByText('Done');
    fireEvent.click(doneButton);

    expect(onDoneTodo).toHaveBeenCalledWith(todo.id);
  });

  test("calls onRemoveTodo when the delete button is clicked", () => {
    const mockTodo = { id:1, description: 'Test todo', flag: false };
    const mockOnRemoveTodo = jest.fn();
    const mockOnDoneTodo = jest.fn();

    const { getByText } = render(
      <MyList
        todo={mockTodo}
        onRemoveTodo={mockOnRemoveTodo}
        onDoneTodo={mockOnDoneTodo}
      />
    );
    const deleteButton = getByText('Delete');
    fireEvent.click(deleteButton);

    expect(mockOnRemoveTodo).toHaveBeenCalledWith(mockTodo.id);
  })
});

describe("MyList component Snapshot", ()=> {
  test("should matches DOM Snapshot", () => {
    const todo = {
      id: 1,
      description: "Test Todo",
      flag: false,
    };

    const onRemoveTodo = jest.fn();
    const onDoneTodo = jest.fn();

    const tree = renderer
      .create(
        <MyList
          todo={todo}
          onRemoveTodo={onRemoveTodo}
          onDoneTodo={onDoneTodo}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
})
