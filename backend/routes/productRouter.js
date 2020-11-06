const productModel = require('../models/productModel');
const router = require('express').Router();

router.get('/mobiles', async(req, res) => {
    let products = await productModel.find({category: "mobiles"})
    products = products.map(product => product.toObject());
    res.render('productCategory', {products});
    console.log(products)
    
});

router.get('/desktops', (req, res) => {
    res.render('productCategory');
});

router.get('/laptops',async (req, res) => {
    // res.render('productCategory');
    console.log(req)
    let products = await productModel.find({category: "laptops"})
    products = products.map(product => product.toObject());
    res.render('productCategory', {products});
    // console.log(products)
});

router.get('/smartwatches', (req, res) => {
    res.render('productCategory');
});

router.get('/accessories', (req, res) => {
    res.render('productCategory')
});

router.get('/product/:id', async (req, res) => {
    name = req.body.name
    console.log(name)
    let product = await productModel.find({name})
    product = product.map(product => product.toObject());
    res.render('productPage' /*product*/)
    
})

router.get('/', async(req,res) => {
    let products = await productModel.find({})
    // products = products.toObject();
    products = products.map(product => product.toObject());
    res.render('productCategory', {products});
});

router.post

router.post('/create', async (req,res) => {
    //  get data from the form
    const {category, name, price, stockAvailability} = req.body;
    // validate data / make sure supplied information is sufficient
    if (!category || !name || !price || !stockAvailability) {
        res.send('Missing required information. Please check form');
        return;
    }
    // check product name is unique
    if (await productModel.checkExists(name)) {
        res.render('product', {err: 'Product with this name already exists'});
        return;
    }
    // create instance of product schema passing in real data
    const product = new productModel({
        category,
        name,
        price,
        stockAvailability
    });
    // save product to datebase 
    product.save();
    // send/rerender the same page to user incase they want to create another product
    res.send('Item created')
});

module.exports = router;