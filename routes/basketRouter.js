const router = require('express').Router();
const orderModel = require('../models/orderModel');
const productModel = require('../models/productModel')
const calculateTotal = require('../lib/basketmod')

router.get('/basket', (req, res) => {
    // console.log(req.session.basket)
    if(!req.hasOwnProperty('session')){
        res.render('basket')
        return
    }
    if(req.session.hasOwnProperty('basket')){
        let total = calculateTotal(req.session.basket)
        res.render('basket', {basket: req.session.basket, total: total} );
        return
    }  
    res.render('basket')

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
    console.log(req.session.basket)
    req.session.basket.total = total
    req.session.save()
})
router.get('/checkout', (req, res)=>{
    // const product = new orderModel({

    //     orderList: req.session.basket,

    //     orderList: req.session.checkout,

    //     totalPrice: 500
    // });

    // product.save();
    res.render('checkout', {checkout: req.session.basket})
})



router.get('/success', (req, res)=>{

    res.render('success')
})



module.exports = router;