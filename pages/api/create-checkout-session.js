const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            adjustable_quantity:{
            enabled:true
            },
           price_data : {
            currency : 'usd',
            product_data : {
                name : 'mobile phone',
                description : 'This is smart',
                images : ['https://images.unsplash.com/photo-1707343843982-f8275f3994c5?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','https://images.unsplash.com/photo-1707343843982-f8275f3994c5?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D']
            },
            unit_amount : 10*100
           },
            
            quantity: 1,
          },
          {
            adjustable_quantity:{
                enabled:true
                },
            price_data : {
             currency : 'usd',
             product_data : {
                 name : 'laptop',
                 description : 'This is smart',
                 images : ['https://images.unsplash.com/photo-1707343843982-f8275f3994c5?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','https://images.unsplash.com/photo-1707343843982-f8275f3994c5?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D']
             },
             unit_amount: 20*100
            },
             
             quantity: 3,
           },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}