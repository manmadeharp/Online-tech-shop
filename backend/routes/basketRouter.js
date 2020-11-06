const router = require('express').Router();


router.get('/basket', (req, res) => {
    res.render('basket');
});

router.post('/basket', (req, res) => {
    //
    /*
    if(!req.session.hasOwnProperty('basket')) {
        req.session.basket = {}
    }

    req.session.basket[_id].quantity++

    if(req.session.basket.hasOwnProperty(_id)){

    }

    req.session.basket[_id] = {name}

    req.session.basket =
    {
        13434441: {
            name: dell
            price: 3400
            quantity: 100
        },
        13441345: {
            name: apple
            price: 35555400
            quantity: 1
        }
    }

    */
})
router.get('/checkout', (req, res)=>{
    res.send('checkout page')
})

module.exports = router;