import { render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import TodoPage from "../pages/todoPage";
import { createItems } from "../services/createItems";
import { getItems } from "../services/getItems";
import { doneItems } from "../services/doneItems";

jest.mock("../services/createItems");
jest.mock("../services/getItems");
jest.mock("../services/doneItems", () => ({
  doneItems: jest.fn(),
}));

global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn(),
  key: jest.fn(),
  length: 0,
};

describe("Todo page", () => {
  test("When click add button should show the text", () => {
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <TodoPage />
      </Router>
    );

    const input = getByPlaceholderText("Please enter a todo item...");
    fireEvent.change(input, { target: { value: "Test todo" } });

    const addButton = getByText("Add");
    fireEvent.click(addButton);

    expect(createItems).toHaveBeenCalledWith({ description: "Test todo" });
    // await waitFor(() => expect(getItems).toHaveBeenCalled());
  });
});
