import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  // Logical error: Reset button doesn't work because setCount(0) is conditional
  const handleReset = () => {
    if (count > 0) {
      setCount(0);
    }
  };

  // Logical error: Increment button doesn't properly increment by 1
  const handleIncrement = () => {
    setCount(count + count); // Incorrect logic, doubles the count instead of incrementing
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default Counter;
