const express = require('express');
const router = express.Router();

const stripe = require('stripe')('sk_test_51HmFuBIepdJVzFGkwKhCg7LDMalXP87zhOGumTLEKqM7PUwO4AIBMqQnnvgBN4xTRDceQ32mFpPEe5PEBGva7PNz00CmTZD69u');

router.get('/cancel', async (req, res) => {
    res.render('cancel')
})

router.get('/success', async (req, res) => {
    // order number generate order id
    // order table
    // email
    
    console.log(req.session.basket)
    res.render('success')
})


const addToStripe = (basket) => {
  let items = []
  
  // console.log('basket')
//   console.log(basket)
  
  // console.dir(test.test)
  for (const [id, product] of Object.entries(basket)) {
        if(id == 'total') {
            continue
        }
        items.push(  
          {
            price_data: {
              currency: 'gbp',
              product_data: {
                name: product.name,
                images: ['https://i.imgur.com/EHyR2nP.png'],
              },
              unit_amount: product.price,
            },
            quantity: product.quantity,
          },
        )
      }
      return items
}

router.post('/create-session', async (req, res) => {
  const YOUR_DOMAIN = 'http://localhost:8444';
  const basket = req.session.basket
  // console.log(basket)
  // total = req.session.basket.total*100
  let items = addToStripe(req.session.basket)
  console.log(items)
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items,
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/stripe/success`,
    cancel_url: `${YOUR_DOMAIN}/stripe/cancel`,
  });
  res.json({ id: session.id });
}); ;

module.exports = router;