import Task from "./Task";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import { URLtodos, getByUserId, addItem } from "../utils";

const Tasks = ({ changeColor, userId }) => {
  const [todos, setTodos] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const setTodoTrue = (id) => {
    const todosCopy = [...todos];
    const index = todosCopy.findIndex((todo) => todo.id === id);

    todosCopy[index].completed = true;

    const isAllTodosCompleted = todosCopy.every(
      (todo) => todo.completed == true
    );

    if (isAllTodosCompleted) {
      changeColor(true);
    }

    setTodos(todosCopy);
  };

  const getTodos = async () => {
    const { data } = await getByUserId(URLtodos, userId);
    setTodos(data);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const changeStatus = () => {
    setShowAdd(!showAdd);
  };

  const addTask = async () => {
    const todosCopy = [...todos];

    todosCopy.push({
      userId: userId,
      id: uuidv4(),
      title: newTitle,
      completed: false,
    });

    setTodos(todosCopy);

    const { data } = await addItem(URLtodos, {
      userId: userId,
      title: newTitle,
      completed: false,
    });
    console.log(data);

    changeColor(false);

    changeStatus();
  };

  return (
    <div>
      <div className="headerSide">
        <h3 className="titleH3">Tasks</h3>
        <button className="buttonAddT_P" onClick={changeStatus}>
          Add Task
        </button>
      </div>

      <div style={{ display: showAdd ? "block" : "none" }}>
        <h2>New Task</h2>

        <label>Title: </label>
        <input type="text" onChange={(e) => setNewTitle(e.target.value)} />

        <button className="button buttonMargin" onClick={changeStatus}>
          Cancel
        </button>
        <button className="button buttonColor" onClick={addTask}>
          Add
        </button>
      </div>

      <div style={{ display: !showAdd ? "block" : "none" }}>
        {todos.map((todo) => {
          return (
            <Task
              key={todo.id}
              todo={todo}
              setTodoTrue={(id) => setTodoTrue(id)}
            />
          );
        })}
      </div>

      <hr></hr>
    </div>
  );
};

export default Tasks;
