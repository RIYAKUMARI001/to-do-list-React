import { useState } from "react";
import './TodoList.css';

export default function TodoList() {
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  let [todos, setTodos] = useState([{ task: "Sample task", id: generateId(), isDone: false }]);
  let [newTodo, setNewTodo] = useState("");

  let addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos((prev) => [...prev, { task: newTodo, id: generateId(), isDone: false }]);
      setNewTodo("");
    }
  };

  let updateTodo = (event) => {
    setNewTodo(event.target.value);
  };

  let deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  let markAsDone = (id) => {
    setTodos((prev) => prev.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isDone: !todo.isDone, 
        };
      }
      return todo;
    }));
  };

  let markAllAsDone = () => {
    setTodos((prev) => prev.map((todo) => {
      return {
        ...todo,
        isDone: true,
      };
    }));
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="todo-container">
      <h1 className="todo-title">Todo List</h1>
      
      <div className="todo-input-container">
        <input
          className="todo-input"
          placeholder="Add a task"
          value={newTodo}
          onChange={updateTodo}
          onKeyPress={handleKeyPress}
        />
        <button
          className="todo-add-btn"
          onClick={addTodo}
        >
          Add
        </button>
      </div>

      <div className="todo-list-container">
        <h3 className="todo-list-title">Tasks</h3>
        {todos.length === 0 ? (
          <p className="todo-empty-message">No tasks yet. Add a task to get started!</p>
        ) : (
    <ul className="todo-list">
    {todos.map((todo) => (
        <li key={todo.id} className="todo-item">
            <span className={`todo-text ${todo.isDone ? "todo-done" : ""}`}>
            {todo.task}
            </span>
    <div className="todo-actions">
        <button
         className={`todo-button ${todo.isDone ? "todo-undo-btn" : "todo-done-btn"}`}
        onClick={() => markAsDone(todo.id)}
         >
        {todo.isDone ? "Undo" : "Done"}
        </button>
        <button
        className="todo-button todo-delete-btn"
        onClick={() => deleteTodo(todo.id)}
        >
        Delete
    </button>
    </div>
    </li>
    ))}
</ul>
)}
</div>

{todos.length > 0 && (
<div className="todo-mark-all-container">
    <button
    className="todo-mark-all-btn"
     onClick={markAllAsDone}
    >
 Mark All Complete
   </button>
</div>
)}
</div>
  );
}