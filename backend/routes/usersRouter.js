const express = require('express');
const router = express.Router();


const userModel = require('../models/userModel');
const UserModel = require('../models/userModel');

const {checkSignedIn} = require('../controllers/auth');
const { response } = require('express');
const {nanoid} = require('nanoid');
const { connection } = require('mongoose');

router.get('/register', (req, res) => {
    res.render('register')
});

router.get('/login', (req, res) => {
    res.render('login')
    // console.log(req.session)
});

router.get('/profile', (req, res) => {
    res.render('myAccount');
    // console.log(req.session)
});

router.get('/users', async(req, res)=> {
    const users = await UserModel.find({});

    res.send(users);
});

router.get('/details', async(req, res) => {
    res.render('accountDetails')
})

router.get('/profile', checkSignedIn, async (req, res) => {
    res.render('myAccount')
})

router.post('/account/create', async(req, res) => {
    const {firstName, lastName, email, phoneNumber, password, passwordConfirmation, addressName, addressNumber, postcode, city, country} = req.body;
    console.log(req.body)
    if (!firstName || !lastName || !email || !password || !phoneNumber || /*!passwordConfirmation ||*/ !addressName || !addressNumber || !postcode || !city || !country) {
        res.send('Missing required information');
        return;
    }

    // if (password != passwordConfirmation) {
    //     res.send('password not equal');
    //     return;
    // }       saved password  = 12345

    if (await UserModel.checkExists(email, phoneNumber)) {
        res.render('login', {error: 'email or phone number already exists'});
        return;
    }

    let hashedpassword = await userModel.hashPassword(password);

    const user = new UserModel({
        firstName,
        lastName,
        email,
        phoneNumber,
        password: hashedpassword,
        addressName,
        addressNumber,
        postcode,
        city,
        country,
        role: 'User',
    });

    user.save();
    req.session.userID = nanoid()
    req.session.email = email
    req.session.save()
    res.redirect('/users/profile')
});

router.post('/login', async(req, res) => {
    let {email, password} = req.body;

    if (!await UserModel.checkExists(email)) {
        res.render('login', {error: 'no email exist'})
        return;
    }

    if (await userModel.comparePassword(email, password)) {
        req.session.userID = nanoid()
        req.session.email = email
        req.session.save()
        res.redirect('/users/profile')
        return;
    }
   
    res.send('You have eneterd the wrong password');
});


module.exports = router;