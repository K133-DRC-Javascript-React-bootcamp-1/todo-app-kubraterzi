import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { completedTodo, removeTodo } from "../redux/todos/todosSlice";

const TodoList = () => {
  let todos = useSelector((state) => state.todos.items);
  const dispatch = useDispatch();

  const activeFilter = useSelector((state) => state.todos.activeFilter);

  if (activeFilter !== "all") {
    todos = todos.filter((todo) =>
      activeFilter === "active"
        ? todo.completedState === false
        : todo.completedState === true
    );
  }

  return (
    <ul className="todo-list">
      {todos.map((todoItem) => (
        <li
          key={todoItem.id}
          className={todoItem.completedState ? "completed" : ""}
        >
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={todoItem.completedState}
              onChange={() => dispatch(completedTodo(todoItem.id))} // onChange yerine onClick de verilebilirdi.
            />
            <label>{todoItem.title}</label>
            <button
              className="destroy"
              onClick={() => dispatch(removeTodo(todoItem.id))}
            ></button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
