import Stripe from 'stripe';

// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log(req.body);

    const params = { 
      submit_type: 'pay',
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      shipping_options: [
        { shipping_rate: 'shr_1OOqKWBmFrZc9YdUWkWKWXOU'},
        { shipping_rate: 'shr_1OOqNjBmFrZc9YdUDbqfNG2k'}
      ],
      line_items: req.body.map((item) => {
        const img = item.image[0].asset._ref;
        const newImage = img.replace('image-', 'https://cdn.sanity.io/images/vfgs4hnz/production/').replace('-webp', '.webp');

        return {
          price_data: {
            currency: 'cad',
            product_data: {
              name: item.name,
              images: [newImage],
            },
            unit_amount: item.price * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity
        }
      }),
      mode: 'payment',
      success_url: `${req.headers.origin}/?success=true`,
      cancel_url: `${req.headers.origin}/?canceled=true`,
    };
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      
      res.status(200).json(session);
      // res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}