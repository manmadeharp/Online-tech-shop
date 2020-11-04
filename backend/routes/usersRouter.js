const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const UserModel = require('../models/userModel');


// router.get('/register', (req, res) => {
//     res.render('register')
// });

// router.get('/login', (req, res) => {
//     res.render('login')
// });

// router.get('/profile', (req, res) => {
//     res.render('myAccount');
// });

router.get('/users', async(req, res)=> {
    const users = await UserModel.find({});

    res.send(users);
});

router.post('/account/create', async(req, res) => {
    const {name, email, age, phoneNumber, password, passwordConfirmation, AddressName, AddressNumber, Postcode, City, Country} = req.body;

    if (!name || !email || !age || !password || !passwordConfirmation || !AddressName || !AddressNumber || !Postcode || !City || !Country) {
        res.send('Missing required information');
        return;
    }

    if (password != passwordConfirmation) {
        res.send('password not equal');
        return;
    }

    if (await UserModel.checkExists(email, phoneNumber)) {
        res.send('A user with this email or phone number already exists');
        return;
    }

    let hashedpassword = await userModel.hashPassword(password);

    const user = new UserModel({
        firstName,
        lastName,
        email,
        phoneNumber,
        password: hashedpassword,
        AddressName,
        AddressNumber,
        Postcode,
        City,
        Country,
        role: 'User',
    });

    user.save();

    res.send('User was created');
});

router.post('/login', async(req, res) => {
    let {email, password} = req.body;

    if (!await UserModel.checkExists(email)) {
        res.send('A user with this email doesn\'t exist');
        return;
    }

    if (await userModel.comparePassword(email, password)) {
        res.send('You are now logged in');
        return;
    }

    res.send('You have eneterd the wrong password');
});


module.exports = router;