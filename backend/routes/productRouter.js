const router = require('express').Router();

router.get('/mobiles', (req, res) => {
    res.send('mobiles page');
});

router.get('/desktops', (req, res) => {
    res.send('desktops page');
});

router.get('/laptops', (req, res) => {
    res.send('laptops page');
});

router.get('/smartwatches', (req, res) => {
    res.send('smartwatches page');
});

router.get('/accessories', (req, res) => {
    res.send('accessories page');
});

module.exports = router;