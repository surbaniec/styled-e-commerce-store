import { useShopContext } from '../context/ShopContext';
import {
  CartStyle,
  CartWrapper,
  Card,
  CardInfo,
  EmptyStyle,
  CheckoutWrapper,
} from '../styles/CartWrapper';
import { QuantityWrapper } from '../styles/ProductDetailsWrapper';
import { FaShoppingCart } from 'react-icons/fa';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';

export default function Cart() {
  const { cartItems, closeCart, addToCart, removeProduct, totalPrice } =
    useShopContext();

  return (
    <CartWrapper onClick={() => closeCart()}>
      <CartStyle onClick={(e) => e.stopPropagation()}>
        {cartItems.length < 1 && (
          <EmptyStyle>
            <h1>You have more shopping to do 😉</h1>
            <FaShoppingCart />
          </EmptyStyle>
        )}
        {cartItems.length >= 1 &&
          cartItems.map((item, i) => {
            return (
              <Card key={i}>
                <img
                  src={item.image.data.attributes.formats.thumbnail.url}
                  alt={item.title}
                />
                <CardInfo>
                  <h3>{item.title}</h3>
                  <h3>{item.price}$</h3>
                  <QuantityWrapper>
                    <span>Quantity</span>
                    <button onClick={() => removeProduct(item)}>
                      <AiFillMinusCircle />
                    </button>
                    <p>{item.quantity}</p>
                    <button onClick={() => addToCart(item)}>
                      <AiFillPlusCircle />
                    </button>
                  </QuantityWrapper>
                </CardInfo>
              </Card>
            );
          })}
        {cartItems.length >= 1 && (
          <CheckoutWrapper>
            <h3>Subtotal: {totalPrice}$</h3>
            <button>Purchase</button>
          </CheckoutWrapper>
        )}
      </CartStyle>
    </CartWrapper>
  );
}
