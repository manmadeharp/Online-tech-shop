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

router.get('/logout', (req, res) => {
    delete req.session.adminID
    delete req.session.email
    console.log(req.session)
    let prompt = 'you have logged out of your session'
    res.redirect('/')
});

// router.get('/profile', (req, res) => {
//     res.render('myAccount');
// });

router.get('/users', async(req, res)=> {
    const admin = await Admin.find({});

    res.send(admin);
});

router.get('/profile', async (req, res) => {
    console.log(req.session)
    res.render('myAccount')  
})

router.get('/orders', checkSignedIn, async (req, res) => {
    res.render('viewOrders')
})


router.post('/login', async(req, res) => {
    let {email, password} = req.body;
    let role = 'Admin'
     if (!await AdminModel.checkExists(email)) {  
         console.log(email)
         res.render('adminlogin', {error: 'no email exist'})
        return;
     }
    
    // if (!await AdminModel.checkRole(email, role)) {
    //     res.render('adminlogin', {error: 'this is not an admin profile'})
    //     return;
    // }

    if (await adminModel.comparePassword(email, password)) {
        req.session.adminID = nanoid()
        req.session.email = email
        req.session.save()
        console.log(req.session)
        res.redirect('/admin/profile')
        return;
    }

    res.send('You have eneterd the wrong password');
});


module.exports = router;