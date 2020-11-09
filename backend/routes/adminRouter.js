const express = require('express');
const router = express.Router();


const adminModel = require('../models/adminModel'); // ask why this included twice 
const AdminModel = require('../models/adminModel');

const {checkSignedIn} = require('../controllers/adminAuth');
const { response } = require('express');
const {nanoid} = require('nanoid')

router.get('/register', (req, res) => {
    res.render('register')
});

router.get('/login', (req, res) => {
    res.render('adminLogin')                 //admin change 1
    // console.log(req.session)
});

// router.get('/profile', (req, res) => {
//     res.render('myAccount');
// });

router.get('/users', async(req, res)=> {
    const admin = await Admin.find({});

    res.send(admin);
});

router.get('/profile', checkSignedIn, async (req, res) => {
    console.log(req.session)
    res.render('myAccount')  
})

router.get('/orders', checkSignedIn, async (req, res) => {
    res.render('viewOrders')
})

router.post('/login', async(req, res) => {
    let {email, password} = req.body;

    if (!await AdminModel.checkExists(email)) {
        res.render('login', {error: 'no email exist'})
        return;
    }

    if (await adminModel.comparePassword(email, password)) {
        req.session.adminID = nanoid()
        // req.session.email = email
        req.session.save()
        console.log(req.session)
        res.redirect('/admin/profile')
        return;
    }

    res.send('You have eneterd the wrong password');
});


module.exports = router;