import { Button } from "react-bootstrap";
import MyList from "./components/MyList";
import React, { useEffect, useState } from "react";
import { getItems } from "./services/getItems";
import { createItems } from "./services/createItems";
import { deleteItems } from "./services/deleteItem";
import { doneItems } from "./services/doneItems";

interface TodoListDetails {
  id: number;
  description: string;
  flag: boolean;
}

interface CreateTodoItemsRequest {
  description: string;
}

const App = () => {
  const [todoData, setTodo] = useState<Array<TodoType>>([]);
  const [newTask, setNewTask] = useState<CreateTodoItemsRequest>({
    description: "",
  });

  useEffect(() => {
    getItems().then((result) => {
      console.log(result[0]);
      setTodo(result[0]);
    });
  }, []);

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
      setTodo(updatedItems[0]);
      // getItems();
    } catch (error: any) {
      console.log("Error creating to-do item: ", error.message);
    }
  };

  const handleDelete = async (todoId: number) => {
    await deleteItems(todoId);
    getItems().then((result) => {
      console.log(result[0]);
      setTodo(result[0]);
    });
  };

  const handleDone = async (todoId: number) => {
    await doneItems(todoId, true);
    setTodo((prevItems) =>
    prevItems.map((item) =>
      item.id === todoId ? { ...item, flag: true} : item
    ));
    console.log("done");
    
    
    // getItems().then((result) => {
    //   console.log(result[0]);
    //   setTodo(result[0]);
    // });
  }

  return (
    <>
      <div className="p-4 m-3 rounded" style={{ backgroundColor: "#DDF2FD" }}>
        <h1
          className="text-primary"
          style={{ paddingBlock: "1rem", color: "", textAlign: "center" }}
        >
          My Todo List
        </h1>

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
          {todoData.map((todo: TodoType, id: number) => (
            <MyList key={id} todo={todo} onRemoveTodo={handleDelete} onDoneTodo={handleDone} />
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
