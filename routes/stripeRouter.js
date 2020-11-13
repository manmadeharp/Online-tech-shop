const express = require('express');
const router = express.Router();
const orderid = require('order-id')('mysecret');
const stripe = require('stripe')('sk_test_51HmFuBIepdJVzFGkwKhCg7LDMalXP87zhOGumTLEKqM7PUwO4AIBMqQnnvgBN4xTRDceQ32mFpPEe5PEBGva7PNz00CmTZD69u');

const orderModel = require('../models/orderModel')

const CreateOrderList = require('../lib/orderList');
const createOrderList = require('../lib/orderList');

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


router.get('/cancel', async (req, res) => {
    res.render('cancel')
})

router.get('/success', async (req, res) => {
    // order number generate order id
    // order table
    // email
    let orderList = createOrderList(req.session.basket)
    const orderNumber = orderid.generate();
    // console.log('orderlist')
    // console.log(orderList)
    let orderListString = JSON.stringify(orderList)
    // console.log('orderlistString')
    // console.log(orderListString)
    // console.log(req.session.basket.total)
    // console.log(req.session.email)
    email = req.session.email
    if (await orderModel.checkExists(email)) {
      let product = await orderModel.findOne({email})
      product.orderList.push(orderListString)
      product.save()
      res.render('success')
      return;
    }
    const order = new orderModel({
        orderList: orderListString,
        totalPrice: req.session.basket.total,
        orderNumber: orderNumber,
        email: req.session.email,
        status: 'Pending'
    });
    order.save()
    res.render('success')
})



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