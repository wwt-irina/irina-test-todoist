import React, { useState } from 'react';
import './TodoList.css';

/**
 * TodoList Component
 * A simple todo list application with add, complete, and delete functionality
 * Demonstrates:
 * - State management with arrays
 * - Input validation
 * - List rendering
 * - Event handling
 */
const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [nextId, setNextId] = useState(1);

  /**
   * Adds a new todo item with input validation
   * @param {Event} e - Form submission event
   */
  const addTodo = (e) => {
    e.preventDefault();

    // Validate input is not empty
    if (!inputValue || inputValue.trim().length === 0) {
      alert('Please enter a todo item');
      return;
    }

    // Validate input length (max 200 characters)
    if (inputValue.trim().length > 200) {
      alert('Todo item must not exceed 200 characters');
      return;
    }

    // Create new todo object
    const newTodo = {
      id: nextId,
      text: inputValue.trim(),
      completed: false,
      createdAt: new Date().toLocaleString(),
    };

    // Add to todos array
    setTodos([...todos, newTodo]);
    setNextId(nextId + 1);
    setInputValue('');
  };

  /**
   * Toggles the completed status of a todo
   * @param {number} id - The ID of the todo to toggle
   */
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  /**
   * Deletes a todo item
   * @param {number} id - The ID of the todo to delete
   */
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  /**
   * Clears all completed todos
   */
  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  // Calculate statistics
  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;

  return (
    <div className="todo-list">
      {/* Add Todo Form */}
      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What needs to be done?"
          className="todo-input"
          maxLength={200}
        />
        <button type="submit" className="btn-add-todo">
          Add Todo
        </button>
      </form>

      {/* Statistics */}
      {totalTodos > 0 && (
        <div className="todo-stats">
          <span className="stat">Total: {totalTodos}</span>
          <span className="stat active">Active: {activeTodos}</span>
          <span className="stat completed">Completed: {completedTodos}</span>
          {completedTodos > 0 && (
            <button onClick={clearCompleted} className="btn-clear">
              Clear Completed
            </button>
          )}
        </div>
      )}

      {/* Todo Items */}
      <div className="todos-container">
        {todos.length === 0 ? (
          <p className="empty-state">No todos yet. Add one to get started!</p>
        ) : (
          <ul className="todos-list">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={`todo-item ${todo.completed ? 'completed' : ''}`}
              >
                <div className="todo-content">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="todo-checkbox"
                    id={`todo-${todo.id}`}
                  />
                  <label htmlFor={`todo-${todo.id}`} className="todo-text">
                    {todo.text}
                  </label>
                </div>
                <div className="todo-actions">
                  <span className="todo-date">{todo.createdAt}</span>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="btn-delete"
                    aria-label="Delete todo"
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TodoList;
