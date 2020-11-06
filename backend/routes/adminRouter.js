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
    res.render('login')
    // console.log(req.session)
});

router.get('/profile', (req, res) => {
    res.render('myAccount'); // is this page going to be the same for admin ? Will it just have extra options
    console.log(req.session)
});

router.get('/users', async(req, res)=> {
    const admin = await Admin.find({});

    res.send(admin);
});

router.get('/profile', checkSignedIn, async (req, res) => {
    res.render('myAccount')   // is this page going to be the same for admin ? Will it just have extra options
})

// router.post('/account/create', async(req, res) => { // is this needed ?
//     const {firstName, lastName, email, phoneNumber, password, passwordConfirmation, addressName, addressNumber, postcode, city, country} = req.body;
//     console.log(req.body)
//     if (!firstName || !lastName || !email || !password || !phoneNumber || /*!passwordConfirmation ||*/ !addressName || !addressNumber || !postcode || !city || !country) {
//         res.send('Missing required information');
//         return;
//     }

//     // if (password != passwordConfirmation) {
//     //     res.send('password not equal');
//     //     return;
//     // }       saved password  = 12345

//     if (await UserModel.checkExists(email, phoneNumber)) {
//         res.render('login', {error: 'email or phone number already exists'});
//         return;
//     }

//     let hashedpassword = await userModel.hashPassword(password);

//     const user = new UserModel({
//         firstName,
//         lastName,
//         email,
//         phoneNumber,
//         password: hashedpassword,
//         addressName,
//         addressNumber,
//         postcode,
//         city,
//         country,
//         role: 'User',
//     });

//     user.save();
//     req.session.userID = nanoid()
//     req.session.email = email
//     req.session.save()
//     res.redirect('/users/profile')
// });

router.post('/login', async(req, res) => {
    let {email, password} = req.body;

    if (!await UserModel.checkExists(email)) {
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