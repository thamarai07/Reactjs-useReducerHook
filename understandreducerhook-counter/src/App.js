import "./App.css";
import { useReducer } from "react";

const initialSatte = { count: 0 };

const counterHandler = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + 1,
      };
    case "DECREMENT":
      return {
        count: state.count - 1,
      };
    case "RESET":
      return initialSatte;
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(counterHandler, initialSatte);
  return (
    <div className="App">
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>INCREMENT</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>DECREMENT</button>
      <button onClick={() => dispatch({ type: "RESET" })}>RESET</button>
    </div>
  );
}

export default App;
