import { ProductDetailsWrapper } from '../styles/ProductDetailsWrapper';
import {
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  ADD_TO_CART,
  SHOW_CART,
  HIDE_CART,
  TOGGLE_CART_ITEM_AMOUNT,
  REMOVE_PRODUCT,
} from './actions';

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
    case REMOVE_PRODUCT: {
      const exist = state.cartItems.find(
        (item) => item.slug === action.payload.slug
      );

      if (exist.quantity === 1) {
        return {
          ...state,
          cartItems: state.cartItems.filter((item) => item.slug !== exist.slug),
        };
      } else if (exist.quantity > 1) {
        const tempCart = state.cartItems.map((cartItem) => {
          if (cartItem.slug === action.payload.slug) {
            return { ...exist, quantity: exist.quantity - 1 };
          } else {
            return cartItem;
          }
        });
        return { ...state, cartItems: tempCart };
      }
    }

    case SHOW_CART:
      return {
        ...state,
        showCart: true,
      };
    case HIDE_CART:
      return {
        ...state,
        showCart: false,
      };
    default:
      return state;
  }
};
