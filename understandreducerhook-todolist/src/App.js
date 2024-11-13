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
    case "SHOW_ERROR":
      return state;
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
  const [error, seterror] = useState(false);

  const handleTodoList = () => {
    if (text === "") {
      seterror(true);
      alert("please enter values`1")
    } else {
      dispatch({ type: "ADD_TODO", text });
      seterror(false);
      settext("");
    }
  };
  console.log(error)

  return (
    <>
      <div className="container">
        <div className="todo__wrapper">
          <input
            name="state"
            value={text}
            onChange={(e) => settext(e.target.value)}
          />
          <button className="add" onClick={handleTodoList}>
            Add List
          </button>
          {error && <p className="error">Please add a todo!</p>}
          <ul>
            {state.todos.map((value) => (
              <li key={value.id}>
                <span
                  style={{
                    textDecoration: value.completed ? "line-through" : "none",
                  }}
                  className={`${value.completed && "completed"}`}
                >
                  {value.text} {value.id}
                </span>
                <button
                  onClick={() => {
                    dispatch({
                      type: "TOGGLE_TODO",
                      id: value.id,
                    });
                    seterror(false);
                  }}
                >
                  {value.completed ? "Undo" : "Completed"}
                </button>
                <button
                  onClick={() =>
                    dispatch({ type: "REMOVE_TODO", id: value.id })
                  }
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
