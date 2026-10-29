import React, { useState } from 'react';
import './Counter.css';

/**
 * Counter Component
 * A simple counter with increment, decrement, and reset functionality
 * Demonstrates useState hook and event handling
 */
const Counter = () => {
  const [count, setCount] = useState(0);

  /**
   * Increments the counter by 1
   */
  const increment = () => {
    setCount(count + 1);
  };

  /**
   * Decrements the counter by 1
   */
  const decrement = () => {
    setCount(count - 1);
  };

  /**
   * Resets the counter to 0
   */
  const reset = () => {
    setCount(0);
  };

  return (
    <div className="counter">
      <div className="counter-display">
        <span className="count-value">{count}</span>
      </div>
      <div className="counter-buttons">
        <button onClick={decrement} className="btn-counter btn-decrement">
          - Decrease
        </button>
        <button onClick={reset} className="btn-counter btn-reset">
          Reset
        </button>
        <button onClick={increment} className="btn-counter btn-increment">
          + Increase
        </button>
      </div>
    </div>
  );
};

export default Counter;
