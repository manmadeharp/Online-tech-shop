const productModel = require('../models/productModel');

const router = require('express').Router();

router.get('/mobiles', (req, res) => {
    res.render('productCategory');
});

router.get('/desktops', (req, res) => {
    res.render('productCategory');
});

router.get('/laptops', (req, res) => {
    res.render('productCategory');
});

router.get('/smartwatches', (req, res) => {
    res.render('productCategory');
});

router.get('/accessories', (req, res) => {
    res.render('productCategory')
});

router.get('/', async(req,res) => {
    let products = await productModel.find({})
    products = products.toObject();
    products = products.map(product => product.toObject());
    res.render('productCategory', {products});
});

module.exports = router;