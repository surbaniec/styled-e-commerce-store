import { useShopContext } from '../context/ShopContext';
import {
  CartStyle,
  CartWrapper,
  Card,
  CardInfo,
  EmptyStyle,
  CheckoutWrapper,
  Cards,
} from '../styles/CartWrapper';
import { QuantityWrapper } from '../styles/ProductDetailsWrapper';
import { FaShoppingCart } from 'react-icons/fa';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import getStripe from '../lib/getStripe';

const card = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};

const cards = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

export default function Cart() {
  const { cartItems, closeCart, addToCart, removeProduct, totalPrice } =
    useShopContext();

  //Payment
  const handleCheckout = async () => {
    const stripe = await getStripe();
    const response = await fetch('/api/stripe', {
      method: 'POST',

      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });

    const data = await response.json();
    await stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <CartWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'tween' }}
      exit={{ opacity: 0 }}
      onClick={() => closeCart()}
    >
      <CartStyle
        initial={{ x: '50%' }}
        animate={{ x: '0%' }}
        exit={{ x: '50%' }}
        onClick={(e) => e.stopPropagation()}
      >
        {cartItems.length < 1 && (
          <EmptyStyle
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1>You have more shopping to do 😉</h1>
            <FaShoppingCart />
          </EmptyStyle>
        )}
        <Cards variants={cards} initial='hidden' animate='show' layout>
          {cartItems.length >= 1 &&
            cartItems.map((item, i) => {
              return (
                <Card layout variants={card} key={i}>
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
        </Cards>
        {cartItems.length >= 1 && (
          <CheckoutWrapper layout>
            <h3>Subtotal: {totalPrice}$</h3>
            <button onClick={handleCheckout}>Purchase</button>
          </CheckoutWrapper>
        )}
      </CartStyle>
    </CartWrapper>
  );
}
