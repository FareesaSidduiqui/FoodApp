import React, { act, createContext, useReducer,useContext } from 'react'

const CartStateContext = createContext()
const CartDispatchContext = createContext()

const reducer = (state,action)=>{
    
 switch(action.type){
    case "ADD":
  const index = state.findIndex(
    item => item.id === action.id && item.size === action.size
  );

  if (index !== -1) {
    // Item with same id and size exists — update qty and price
    const updatedState = [...state];
    updatedState[index] = {
      ...updatedState[index],
      qty: updatedState[index].qty + parseInt(action.qty),
      price: updatedState[index].price + action.price,
    };
    return updatedState;
  } else {
    // New item — add to cart
    return [
      ...state,
      {
        id: action.id,
        name: action.name,
        price: action.price,
        img : action.img,
        qty: parseInt(action.qty),
        size: action.size,
      },
    ];
  }

    case "REMOVE":
        return state.filter(item => item.id !== action.id);
    
    case "DROP":
        let newArr = []
        return newArr
    default:
        console.log("error in reducer");
        return state        
 }
}

export function CartProvider({children}){

    const [state, dispatch] = useReducer(reducer,[])
    return(
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export const UseCart = () => useContext(CartStateContext)
export const DispatchCart = () => useContext(CartDispatchContext)