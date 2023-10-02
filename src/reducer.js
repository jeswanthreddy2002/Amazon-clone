 export const initialState = {
    basket: [],
    total: 0,
    user:null
  };
  
  const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
      case "ADD_TO_BASKET":
        return {
          ...state,
          basket: [...state.basket, action.item],
          total: state.total + action.item.price
        };
      case "REMOVE_FROM_THE_BASKET":
        const index = state.basket.findIndex((basketItem) => basketItem.id === action.id);
        const newBasket = [...state.basket];
        if (index >= 0) {
          const removedItem = newBasket.splice(index, 1);
          return {
            ...state,
            basket: newBasket,
            total: state.total - removedItem[0].price
          };
        } else {
          console.log("Can't remove the product");
          return state;
        }
      case "increase_the_value":
        return {
          ...state,
          total: state.total + action.price
        };
      case "decrease_the_value": 
        return {
          ...state,
          total: state.total - action.price
        };
      case "SET_USER":
        return {
          ...state,
          user:action.user
        }
      default:
        return state;
    }
  };
  
  export default reducer;
  
  