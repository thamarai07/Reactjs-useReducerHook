import "./App.css";
import { useReducer } from "react";

const initialState = {
  name: "",
  email: "",
  mobile: "",
};

const Formhandler = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.error,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(Formhandler, initialState);

  const handleChange = (e) => {
    dispatch({
      type: "SET_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!state.name) {
      dispatch({ type: "SET_ERROR", error: "All fields are required!" });
      return;
    }
    console.log("Form submitted:", state);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input name="name" value={state.name} onChange={handleChange} />
        {state.error && <p style={{ color: "red" }}>{state.error}</p>}
        <button type="submit">Submit</button>
        <button type="button" onClick={() => dispatch({ type: "RESET" })}>
          Reset
        </button>
      </form>
    </div>
  );
}

export default App;
