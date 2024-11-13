import "./App.css";
import React, { useReducer, useState } from "react";

const initialState = { todos: [] };

function todoreducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return {
        todos: [
          ...state.todos,
          { id: Date.now(), text: action.text, completed: false },
        ],
      };
    case "REMOVE_TODO":
      return {
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };
    case "TOGGLE_TODO":
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(todoreducer, initialState);

  const [text, settext] = useState("");

  const handleTodoList = () => {
    dispatch({ type: "ADD_TODO", text });
    settext("");
  };

  return (
    <>
      <div>
        <input
          name="state"
          value={text}
          onChange={(e) => settext(e.target.value)}
        />
        <button onClick={handleTodoList}>Add List</button>
        <ul>
          {state.todos.map((value) => (
            <li key={value.id}>
              <span
                style={{
                  textDecoration: value.completed ? "line-through" : "none",
                }}
              >
                {value.text}
              </span>
              <button
                onClick={() =>
                  dispatch({
                    type: "TOGGLE_TODO",
                    id: value.id,
                  })
                }
              >
                {value.completed ? "Undo" : "Completed"}
              </button>
              <button
                onClick={() => dispatch({ type: "REMOVE_TODO", id: value.id })}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
