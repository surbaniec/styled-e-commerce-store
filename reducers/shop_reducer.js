import { INCREASE_QUANTITY, DECREASE_QUANTITY, ADD_TO_CART } from './actions';

export const shop_reducer = (state, action) => {
  switch (action.type) {
    case INCREASE_QUANTITY:
      return {
        ...state,
        quantity: state.quantity + 1,
      };
    case DECREASE_QUANTITY:
      if (state.quantity - 1 < 1) {
        return {
          ...state,
          quantity: 1,
        };
      }
      return {
        ...state,
        quantity: state.quantity - 1,
      };
    case ADD_TO_CART:
      const exist = state.cartItems.find(
        (item) => item.slug === action.payload.slug
      );

      if (exist) {
        const tempCart = state.cartItems.map((cartItem) => {
          if (cartItem.slug === action.payload.slug) {
            return { ...exist, quantity: exist.quantity + state.quantity };
          } else {
            return cartItem;
          }
        });
        return { ...state, cartItems: tempCart };
      } else {
        const newItem = {
          ...action.payload,
          quantity: state.quantity,
        };
        return {
          ...state,
          cartItems: [...state.cartItems, newItem],
          quantity: 1,
        };
      }
    default:
      return state;
  }
};
