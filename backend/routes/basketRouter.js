const router = require('express').Router();


router.get('/basket', (req, res) => {
    res.render('basket');
});

module.exports = router;