const express = require('express'); // import express
const hbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const mongoose  = require('mongoose');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const stripe = require('stripe')('sk_test_51HmFuBIepdJVzFGkwKhCg7LDMalXP87zhOGumTLEKqM7PUwO4AIBMqQnnvgBN4xTRDceQ32mFpPEe5PEBGva7PNz00CmTZD69u');
app.use(express.static('.'));

const sessionModel = require('./models/sessionModel')

const productRouter = require('./routes/productRouter')
const usersRouter = require('./routes/usersRouter')
const basketRouter = require('./routes/basketRouter')
// const checkoutRouter = require('./routes/checkoutRouter')
const adminRouter = require('./routes/adminRouter')
require('dotenv').config(); // now we can use dotenv to run our server

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

// router.post('/checkout', (req, res) => {
    
// })

app.engine('.hbs', hbs({
    extname: '.hbs',
    defaultLayout: 'layout'
}));

app.set('view engine', '.hbs');

mongoose.connect('mongodb+srv://root:password1234@cluster0.voeb0.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const YOUR_DOMAIN = 'http://localhost:8444';

app.post('/create-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'gbp',
          product_data: {
            name: 'Stubborn Attachments',
            images: ['https://i.imgur.com/EHyR2nP.png'],
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });
  res.json({ id: session.id });
}); 

app.use(session({
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    secret: 'keyboardcat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, //process.env.IN_PROD
        sameSite: true,
        maxAge: 1000 * 60 * 60 * 2 // 2 hours
    },
}));

app.use(async (req, res, next) => {
    // console.log(await sessionModel.checkSession(req.session.userID))
    if (await sessionModel.checkSession(req.session.userID)){
        res.locals.email = req.session.email
    }
    if (req.session.userID) {
        res.locals.isuserID = true
    }
    if (req.session.adminID) {
        res.locals.isadminID = true
    }
    next()
})

// app.use(async (req, res, next) => {                              
//     if (await sessionModel.checkSession(req.session.adminID)){
//         res.locals.email = req.session.email
//     }
//     next()
// })

app.use('/products', productRouter);

app.use('/users', usersRouter);

app.use('/admin', adminRouter);

app.use('/', basketRouter)

app.get('/', (req, res) => {
    res.render('index');
});


// const YOUR_DOMAIN = 'http://localhost:8444';
app.post('/create-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Stubborn Attachments',
            images: ['https://i.imgur.com/EHyR2nP.png'],
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `http://localhost:8444/success`,
    cancel_url: `http://localhost:8444/products/laptops`,
  });
  res.json({ id: session.id });
});



const port = process.env.PORT || 8444

app.listen(port, ()=> {
    console.log(`Server is tunning on port ${port}`);
    
});




