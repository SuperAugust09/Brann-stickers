// Netlify serverless function: /.netlify/functions/create-checkout
// Krev: npm install stripe  (kjøres automatisk av Netlify)

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const { productName, quantity, price } = body;

  if (!productName || !quantity || !price) {
    return { statusCode: 400, body: 'Missing required fields' };
  }

  const baseUrl = process.env.URL || 'http://localhost:8888';

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'nok',
            unit_amount: price * 100, // Stripe bruker øre
            product_data: {
              name: `${productName} – ${quantity} stk`,
              description: `SK Brann Ultras Stickers · ${quantity} stickers`,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/suksess.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/produkter.html`,
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['NO', 'SE', 'DK', 'FI', 'DE', 'NL', 'GB'],
      },
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    console.error('Stripe error:', err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
