import React, { createContext, useContext, useReducer } from 'react';
import {
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  ADD_TO_CART,
  SHOW_CART,
  HIDE_CART,
  REMOVE_PRODUCT,
} from '../reducers/actions';
import { shop_reducer } from '../reducers/shop_reducer';

const initialState = {
  quantity: 1,
  showCart: false,
  cartItems: [],
};

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [state, dispatch] = useReducer(shop_reducer, initialState);

  //Increase product quantity
  const increaseQuantity = () => {
    dispatch({ type: INCREASE_QUANTITY });
  };

  //Decrease product quantity
  const decreaseQuantity = () => {
    dispatch({ type: DECREASE_QUANTITY });
  };

  //Add to cart
  const addToCart = (product) => {
    dispatch({ type: ADD_TO_CART, payload: product });
  };

  const openCart = () => {
    dispatch({ type: SHOW_CART });
  };

  const closeCart = () => {
    dispatch({ type: HIDE_CART });
  };

  const removeProduct = (product) => {
    dispatch({ type: REMOVE_PRODUCT, payload: product });
  };

  return (
    <ShopContext.Provider
      value={{
        ...state,
        increaseQuantity,
        decreaseQuantity,
        addToCart,
        removeProduct,
        openCart,
        closeCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShopContext = () => {
  return useContext(ShopContext);
};
