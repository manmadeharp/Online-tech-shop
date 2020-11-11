const router = require('express').Router();
const orderModel = require('../models/orderModel');
const productModel = require('../models/productModel')
const calculateTotal = require('../lib/basketmod')

router.get('/basket', (req, res) => {
    // console.log(req.session)
    let total = calculateTotal(req.session.basket)
    
    res.render('basket', {basket: req.session.basket, total: total} );

});

router.post('/basket/remove', (req, res) => {
    let _id = req.body._id
    // delete req.session.basket[_id]
    console.log(req.session.basket)
    res.render('basket', {basket: req.session.basket}); 
    
})

router.post('/basket', async (req, res) => {
    let _id = req.body._id
    // console.log(_id)
    let product = await productModel.findOne({_id})
    // console.log(product)
    // product = product.toObject()
    // console.log(product)
    // console.log(req.session)
    if(!req.session.hasOwnProperty('basket')) {
        req.session.basket = {
            total: 0
        }
    }
    if(!req.session.basket.hasOwnProperty(_id)){
        req.session.basket[_id] = {
            name: product.name,
            price: product.price,
            quantity: 1
        }
    }
    else{
        req.session.basket[_id].quantity += 1
    }
    let total = calculateTotal(req.session.basket)
    req.session.basket.total = total
    req.session.save()
})
router.get('/checkout', (req, res)=>{
    // const product = new orderModel({
<<<<<<< HEAD
    //     orderList: req.session.basket,
=======
    //     orderList: req.session.checkout,
>>>>>>> routers
    //     totalPrice: 500
    // });

    // product.save();
<<<<<<< HEAD
    res.render('checkout', {checkout: req.session.basket})
})


=======
    res.render('checkout', {checkout: req.session.checkout})
})


router.get('/success', (req, res)=>{

    res.render('success', {checkout: req.session.success})
})


>>>>>>> routers
module.exports = router;