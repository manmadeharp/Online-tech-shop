const router = require("express").Router();

router.get('/', (req, res) => {
    res.send('index page');
});

router.get('/signup', (req, res) => {
    res.send('sign up page');
});

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

router.get('/basket', (req, res) => {
    res.send('basket page');
});

module.exports = router;