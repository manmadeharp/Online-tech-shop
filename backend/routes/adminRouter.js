const express = require('express');
const router = express.Router();
const adminModel = require('../models/adminModel');
const AdminModel = require('../models/adminModel');

router.get('/admin', async(req, res)=> {
    const users = await AdminModel.find({});

    res.send(users);
});

router.post('/account/create', async(req, res) => {
    const {firstName, lastName, email, phoneNumber, password, passwordConfirmation, AddressName, AddressNumber, Postcode, City, Country} = req.body;

    if (!firstName || !lastName || !email || !password || !passwordConfirmation || !AddressName || !AddressNumber || !Postcode || !City || !Country) {
        res.send('Missing required information');
        return;
    }

    if (password != passwordConfirmation) {
        res.send('password not equal');
        return;
    }

    if (await AdminModel.checkExists(email, phoneNumber)) {
        res.send('A user with this email or phone number already exists');
        return;
    }

    let hashedpassword = await adminModel.hashPassword(password);

    const user = new AdminModel({
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
        role: 'Admin',
    });

    user.save();

    res.send('User was created');
});

router.post('/login', async(req, res) => {
    let {email, password} = req.body;

    if (!await AdminModel.checkExists(email)) {
        res.send('A user with this email doesn\'t exist');
        return;
    }

    if (await adminModel.comparePassword(email, password)) {
        res.send('You are now logged in');
        return;
    }

    res.send('You have eneterd the wrong password');
});

module.exports = router;