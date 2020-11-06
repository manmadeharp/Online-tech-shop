const router = require('express').Router();


router.get('/basket', (req, res) => {
    res.render('basket');
});
router.get('/checkout', (req, res)=>{
    res.send('checkout page')
})
module.exports = router;