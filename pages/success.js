import { useRouter } from 'next/router';
import {
  SuccessAddress,
  SuccessCard,
  SuccessInfo,
  SuccessOrder,
  SuccessWrapper,
} from '../styles/SuccessWrapper';
const stripe = require('stripe')(
  `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);

export async function getServerSideProps(params) {
  const order = await stripe.checkout.sessions.retrieve(
    params.query.session_id,
    { expand: ['line_items'] }
  );
  return { props: { order } };
}

export default function Success({ order }) {
  const route = useRouter();
  return (
    <SuccessWrapper>
      <SuccessCard
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.75 }}
      >
        <h1>Thank you for your order!</h1>
        <h2>A confirmation email has been sent to</h2>
        <h2>{order.customer_details.email}</h2>
        <SuccessInfo>
          <SuccessAddress>
            <h3>Address</h3>
            {Object.entries(order.customer_details.address).map(
              ([key, value]) => (
                <p key={key}>
                  {key} : {value}
                </p>
              )
            )}
          </SuccessAddress>
          <SuccessOrder>
            <h3>Products</h3>
            <h2>
              {order.line_items.data.map((item) => (
                <div key={item.id}>
                  <p>Product: {item.description}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: {item.price.unit_amount}</p>
                </div>
              ))}
            </h2>
          </SuccessOrder>
        </SuccessInfo>

        <button onClick={() => route.push('/')}>Continue Shopping</button>
      </SuccessCard>
    </SuccessWrapper>
  );
}
