import { updateItem, URLtodos } from "../utils";

const Task = ({ setTodoTrue, todo }) => {
  const completed = async () => {
    setTodoTrue(todo.id);

    if (todo.id <= 200) {
      const { data } = await updateItem(URLtodos, todo.id, {
        ...todo,
        completed: true,
      });
      console.log(data);
    }
  };

  return (
    <div className="post_task">
      <label>Title: </label> {todo.title} <br />
      <label>Completed: </label> {todo.completed ? "V" : "X"} <br />
      <br />
      {todo.completed ? null : (
        <button onClick={completed}>Mark Completed</button>
      )}
      <hr></hr>
    </div>
  );
};

export default Task;
