import React, { useState } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import Counter from './components/Counter';
import UserGreeting from './components/UserGreeting';

/**
 * Main App Component
 * A simple React application demonstrating common patterns:
 * - State management with hooks
 * - Component composition
 * - Event handling
 * - Conditional rendering
 */
function App() {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /**
   * Handles user login with input validation
   * @param {Event} e - Form submission event
   */
  const handleLogin = (e) => {
    e.preventDefault();
    
    // Validate username input
    if (!username || username.trim().length === 0) {
      alert('Please enter a valid username');
      return;
    }

    if (username.trim().length < 3) {
      alert('Username must be at least 3 characters');
      return;
    }

    setIsLoggedIn(true);
  };

  /**
   * Handles user logout
   * Resets the application state
   */
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Simple React Application</h1>
        <p>A demonstration of React fundamentals</p>
      </header>

      <main className="App-main">
        {/* Login/Logout Section */}
        <section className="login-section">
          {!isLoggedIn ? (
            <form onSubmit={handleLogin} className="login-form">
              <h2>Login</h2>
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="username-input"
                maxLength={50}
              />
              <button type="submit" className="btn-primary">
                Login
              </button>
            </form>
          ) : (
            <div className="user-section">
              <UserGreeting username={username} />
              <button onClick={handleLogout} className="btn-secondary">
                Logout
              </button>
            </div>
          )}
        </section>

        {/* Only show features when logged in */}
        {isLoggedIn && (
          <>
            {/* Counter Component */}
            <section className="feature-section">
              <h2>Interactive Counter</h2>
              <Counter />
            </section>

            {/* Todo List Component */}
            <section className="feature-section">
              <h2>Todo List</h2>
              <TodoList />
            </section>
          </>
        )}
      </main>

      <footer className="App-footer">
        <p>&copy; 2024 Simple React App. Built with React.</p>
      </footer>
    </div>
  );
}

export default App;
