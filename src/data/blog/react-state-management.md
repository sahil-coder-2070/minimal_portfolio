---
title: "State Management in React: A Beginner's Guide"
description: "Understand how to manage state in React effectively using useState, useReducer, and context API."
image: "/blogimage/react-state.png"
tags: ["React", "State Management", "Hooks"]
date: "2026-01-21"
isPublished: true
---

---

# State Management in React: A Beginner's Guide

State in React is the part of a component that changes over time. That’s it. The rest of this post is about the three tools React gives you for managing it (`useState`, `useReducer`, and the Context API) and when each one is actually the right choice. Most state problems I’ve seen in the wild come from picking the wrong one.

## What is State in React?

Before diving into the tools, let's clarify what state means in React. State represents data that can change over time and affects how your component renders. When state changes, React re-renders the component to reflect those changes.

There are two main types of state in React:

1. **Local State**: State that belongs to a specific component
2. **Global State**: State that needs to be shared across multiple components

## Local State Management with useState

### The Basics of useState

The `useState` hook is the simplest way to manage local state in functional components. It returns an array with two elements: the current state value and a function to update it.

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}
```

### Updating State

When updating state, you can pass a new value directly or use a function that receives the previous state:

```jsx
// Direct value
setCount(5);

// Using previous state
setCount((prevCount) => prevCount + 1);
```

Always use the functional update when the new state depends on the previous state to avoid stale closures.

### State with Objects and Arrays

Managing complex state structures requires careful handling:

```jsx
function UserForm() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    age: 0,
  });

  const updateName = (name) => {
    setUser((prevUser) => ({
      ...prevUser,
      name,
    }));
  };

  const updateEmail = (email) => {
    setUser((prevUser) => ({
      ...prevUser,
      email,
    }));
  };

  return (
    <form>
      <input
        type="text"
        value={user.name}
        onChange={(e) => updateName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={user.email}
        onChange={(e) => updateEmail(e.target.value)}
        placeholder="Email"
      />
    </form>
  );
}
```

### Multiple useState Calls

You can use multiple `useState` hooks in a single component:

```jsx
function MultiStateComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Component logic here
}
```

## Advanced Local State with useReducer

### When to Use useReducer

`useReducer` is ideal for complex state logic that involves multiple sub-values or when the next state depends on the previous one. It's similar to how Redux works but built into React.

```jsx
import { useReducer } from "react";

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return initialState;
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
}
```

### Complex Reducer Example

Let's build a more complex example with a todo list:

```jsx
const initialState = {
  todos: [],
  filter: "all",
};

function todoReducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false,
          },
        ],
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };
    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const filteredTodos = state.todos.filter((todo) => {
    if (state.filter === "completed") return todo.completed;
    if (state.filter === "active") return !todo.completed;
    return true;
  });

  return (
    <div>
      <input
        type="text"
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            dispatch({ type: "ADD_TODO", payload: e.target.value });
            e.target.value = "";
          }
        }}
        placeholder="Add todo"
      />
      <div>
        <button
          onClick={() => dispatch({ type: "SET_FILTER", payload: "all" })}
        >
          All
        </button>
        <button
          onClick={() => dispatch({ type: "SET_FILTER", payload: "active" })}
        >
          Active
        </button>
        <button
          onClick={() => dispatch({ type: "SET_FILTER", payload: "completed" })}
        >
          Completed
        </button>
      </div>
      <ul>
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => dispatch({ type: "TOGGLE_TODO", payload: todo.id })}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Global State Management with Context API

### Creating a Context

The Context API allows you to share state across the component tree without prop drilling:

```jsx
import { createContext, useContext, useState } from "react";

// Create the context
const ThemeContext = createContext();

// Create a provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the context
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// Usage in components
function ThemedButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        backgroundColor: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#000" : "#fff",
      }}
    >
      Toggle Theme
    </button>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ThemedButton />
    </ThemeProvider>
  );
}
```

### Context with useReducer

Combining Context with useReducer provides a powerful state management solution:

```jsx
import { createContext, useContext, useReducer } from "react";

const StoreContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

function storeReducer(state, action) {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, loading: true };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGIN_FAILURE":
      return { ...state, loading: false };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
}

function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}

// Usage
function LoginButton() {
  const { state, dispatch } = useStore();

  const handleLogin = async () => {
    dispatch({ type: "LOGIN_START" });
    try {
      // Simulate API call
      const user = await fakeLoginAPI();
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  if (state.loading) return <div>Loading...</div>;

  return (
    <button onClick={handleLogin} disabled={state.isAuthenticated}>
      {state.isAuthenticated ? "Logged In" : "Login"}
    </button>
  );
}
```

## Advanced Patterns

### Custom Hooks for State Logic

Create reusable state logic with custom hooks:

```jsx
import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

// Usage
function App() {
  const [name, setName] = useLocalStorage("name", "John");

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
}
```

### State Machines with useReducer

Implement state machines for complex UI flows:

```jsx
const states = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

const actions = {
  FETCH_START: "fetch_start",
  FETCH_SUCCESS: "fetch_success",
  FETCH_ERROR: "fetch_error",
  RESET: "reset",
};

function asyncReducer(state, action) {
  switch (state.status) {
    case states.IDLE:
      if (action.type === actions.FETCH_START) {
        return { status: states.LOADING };
      }
      break;
    case states.LOADING:
      if (action.type === actions.FETCH_SUCCESS) {
        return { status: states.SUCCESS, data: action.payload };
      }
      if (action.type === actions.FETCH_ERROR) {
        return { status: states.ERROR, error: action.payload };
      }
      break;
    case states.SUCCESS:
    case states.ERROR:
      if (action.type === actions.RESET) {
        return { status: states.IDLE };
      }
      break;
    default:
      break;
  }
  return state;
}

function useAsync(asyncFunction) {
  const [state, dispatch] = useReducer(asyncReducer, {
    status: states.IDLE,
  });

  const run = useCallback(() => {
    dispatch({ type: actions.FETCH_START });
    asyncFunction()
      .then((data) => {
        dispatch({ type: actions.FETCH_SUCCESS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: actions.FETCH_ERROR, payload: error });
      });
  }, [asyncFunction]);

  const reset = useCallback(() => {
    dispatch({ type: actions.RESET });
  }, []);

  return { state, run, reset };
}
```

## Performance Considerations

### Avoiding Unnecessary Re-renders

Use `React.memo` to prevent re-renders when props haven't changed:

```jsx
const TodoItem = React.memo(({ todo, onToggle }) => {
  console.log("TodoItem rendered");
  return <li onClick={() => onToggle(todo.id)}>{todo.text}</li>;
});
```

### useCallback and useMemo

Optimize function and value references:

```jsx
const toggleTodo = useCallback((id) => {
  setTodos((prevTodos) =>
    prevTodos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    ),
  );
}, []);

const completedTodos = useMemo(
  () => todos.filter((todo) => todo.completed),
  [todos],
);
```

## Common Patterns and Anti-patterns

### Lifting State Up

When multiple components need to share state, lift it to their common parent:

```jsx
function ParentComponent() {
  const [sharedState, setSharedState] = useState("");

  return (
    <div>
      <ChildA sharedState={sharedState} setSharedState={setSharedState} />
      <ChildB sharedState={sharedState} setSharedState={setSharedState} />
    </div>
  );
}
```

### Avoiding State in Wrong Places

Don't put everything in global state. Keep local what should be local.

### State Initialization

Be careful with state initialization, especially with asynchronous data:

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchUser(userId)
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return <div>User not found</div>;

  return <div>Welcome, {user.name}!</div>;
}
```

## Testing State Management

### Testing useState

```jsx
import { render, fireEvent } from "@testing-library/react";
import { Counter } from "./Counter";

test("increments counter", () => {
  const { getByText } = render(<Counter />);
  const incrementButton = getByText("+");

  fireEvent.click(incrementButton);
  expect(getByText("Count: 1")).toBeInTheDocument();
});
```

### Testing useReducer

```jsx
import { render, fireEvent } from "@testing-library/react";
import { TodoApp } from "./TodoApp";

test("adds a todo", () => {
  const { getByPlaceholderText, getByText } = render(<TodoApp />);
  const input = getByPlaceholderText("Add todo");

  fireEvent.change(input, { target: { value: "New todo" } });
  fireEvent.keyPress(input, { key: "Enter", code: 13, charCode: 13 });

  expect(getByText("New todo")).toBeInTheDocument();
});
```

## When to Use External Libraries

While React's built-in state management is powerful, sometimes you need more:

- **Redux**: For very large applications with complex state logic
- **Zustand**: Lightweight state management with a simple API
- **Recoil**: Facebook's state management library for React
- **Jotai**: Atomic state management inspired by Recoil

## Conclusion

Mastering state management in React is essential for building scalable applications. Start with `useState` for simple cases, move to `useReducer` for complex local state, and use Context API for global state sharing. Remember to keep your state as local as possible and only lift it up when necessary.

The key principles are:

1. Keep state close to where it's used
2. Use the right tool for the job
3. Optimize for performance when needed
4. Test your state logic thoroughly

With these patterns in your toolkit, you'll be well-equipped to handle state in any React application. Happy coding!

## Resources

- [React Official Documentation on State](https://react.dev/learn/state-and-lifecycle)
- [useState Hook Documentation](https://react.dev/reference/react/useState)
- [useReducer Hook Documentation](https://react.dev/reference/react/useReducer)
- [Context API Documentation](https://react.dev/learn/passing-data-deeply-with-context)

---

This guide provides a solid foundation for state management in React. As you build more complex applications, you'll encounter scenarios that require these patterns and more advanced techniques. Keep practicing and experimenting to find what works best for your specific use cases.
