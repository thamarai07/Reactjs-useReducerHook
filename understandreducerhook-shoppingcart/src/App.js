import "./App.css";
import { useReducer } from "react";
const initialState = [];

const cardReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return [
        ...state,
        {
          id: action.id,
          name: action.name ,
          price: action.price,
          quantity: 1,
        },
      ];
    case "REMOVE_ITEM":
      return state.filter((value) => value.id !== action.id);
    case "UPDATE_QUANTITY":
      return state.map((value) =>
        value.id === action.id ? { ...value, quantity: action.quantity } : value
      );
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer( cardReducer,initialState);
  return (
    <>
      <div className="App">
        <button
          onClick={() =>
            dispatch({ type: "ADD_ITEM", id: 1, name: "Item 1", price: 10 })
          }
        >
          Add 1 Item
        </button>
        <ul>
          {state && state.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price} X {item.quantity}
              <button
                onClick={() => dispatch({ type: "REMOVE_ITEM", id: item.id })}
              >
                Remove
              </button>
              <button
                onClick={() =>
                  dispatch({
                    type: "UPDATE_QUANTITY",
                    id: item.id,
                    quantity: item.quantity + 1,
                  })
                }
              >

                Increase Quantity
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
