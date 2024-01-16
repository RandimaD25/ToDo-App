import { Button } from "react-bootstrap";
import MyList from "../components/myList";
import React, { useEffect, useState } from "react";
import { getItems } from "../services/getItems";
import { createItems } from "../services/createItems";
import { deleteItems } from "../services/deleteItem";
import { doneItems } from "../services/doneItems";
import { isAuthenticated } from "../utilities/is-authenticated";
import { useNavigate } from "react-router-dom";

interface CreateTodoItemsRequest {
  description: string;
}

const TodoPage = () => {
  const [todoData, setTodoData] = useState<Array<TodoType>>([]);
  const [newTask, setNewTask] = useState<CreateTodoItemsRequest>({
    description: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }
    getItems().then((result) => {
      console.log(result);
      setTodoData(result);
    });
  }, [navigate]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask((prevTask) => ({
      ...prevTask,
      [event.target.name]: event.target.value,
    }));
  };

  const handleClick = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await createItems(newTask);
      setNewTask({ description: "" });
      console.log(newTask);
      const updatedItems = await getItems();
      setTodoData(updatedItems);
    } catch (error: any) {
      console.log("Error creating to-do item: ", error.message);
    }
  };

  const handleDelete = async (todoId: number) => {
    await deleteItems(todoId);
    getItems().then((result) => {
      console.log(result);
      setTodoData(result);
    });
  };

  const handleDone = async (todoId: number) => {
    await doneItems(todoId, true);
    setTodoData((prevItems) =>
      prevItems.map((item) =>
        item.id === todoId ? { ...item, flag: true } : item
      )
    );
    console.log("done");
  };

  const userLogout = async () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="p-4 m-3 rounded" style={{ backgroundColor: "#DDF2FD" }}>
        <div className="d-flex justify-content-between">
          <div></div>{" "}
          <h1 className="text-primary m-auto" style={{ paddingBlock: "1rem" }}>
            My Todo List
          </h1>
          <div className="align-self-start">
            {/* <p>{userName?.name}</p> */}
            <button className="btn btn-dark" onClick={userLogout}>
              Logout
            </button>
          </div>
        </div>

        <form
          action=""
          onSubmit={handleClick}
          className="d-flex gap-4 justify-content-center"
        >
          <input
            type="text"
            id="inputItem"
            name="description"
            className="form-control w-50"
            placeholder="Please enter a todo item..."
            onChange={handleChange}
          ></input>
          <Button className="btn btn-primary" type="submit">
            Add
          </Button>
        </form>

        <div className="justify-content-center">
          {todoData.map((todo: TodoType) => (
            <MyList
              key={todo.id}
              todo={todo}
              onRemoveTodo={handleDelete}
              onDoneTodo={handleDone}
            />
          ))}
        </div>
      </div>
  );
};

export default TodoPage;
