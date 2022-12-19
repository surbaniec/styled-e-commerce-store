import Stripe from 'stripe';

const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Create Checkout Session
      const session = await stripe.checkout.sessions.create({
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        shipping_address_collection: {
          allowed_countries: ['PL'],
        },
        shipping_options: [{ shipping_rate: 'shr_1MGnbcGNAlTspaLnarHCue0W' }],
        line_items: req.body.map((item) => {
          return {
            price_data: {
              currency: 'pln',
              product_data: {
                name: item.title,
                images: [item.image.data.attributes.formats.thumbnail.url],
              },
              unit_amount: item.price * 100,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${req.headers.origin}/success?&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/canceled`,
      });
      return res.status(200).json(session);
    } catch (error) {
      return res.status(error.statusCode || 500).json(error.message);
    }
  }
}
