import { useRouter } from 'next/router';
const stripe = require('stripe')(
  `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);
import { getSession } from '@auth0/nextjs-auth0';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { ProfileWrapper } from '../styles/ProfileWrapper';
import { formatMoney } from '../lib/formatMoney';

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    // access the user session
    const session = await getSession(ctx.req, ctx.res);
    const stripeId = session.user[`${process.env.BASE_URL}/stripe_customer_id`];
    const paymentIntents = await stripe.paymentIntents.list({
      customer: stripeId,
    });
    return { props: { orders: paymentIntents.data } };
  },
});

export default function Profile({ user, orders }) {
  const route = useRouter();

  return (
    user && (
      <div>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <div>
          {orders.map((order) => (
            <ProfileWrapper key={order.id}>
              <div>
                <h1>Order Number: {order.id}</h1>
                <h2>Amount: {formatMoney(order.amount)}</h2>
              </div>
              <div>
                <h1>Receipt Email: {user.email}</h1>
              </div>
            </ProfileWrapper>
          ))}
        </div>
        <button onClick={() => route.push('/api/auth/logout')}>Log out</button>
      </div>
    )
  );
}
