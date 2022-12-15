import { INCREASE_QUANTITY, DECREASE_QUANTITY } from './actions';

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
    default:
      return state;
  }
};
