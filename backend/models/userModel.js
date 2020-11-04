const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const user = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phoneNumber: {type: String, required: false, unique: true},
    password: {type: String, required: true},
    AddressName: {type: String, required: true}, 
    AddressNumber: {type: String, required: true}, 
    Postcode: {type: String, required: true}, 
    City: {type: String, required: true}, 
    Country: {type: String, required: true},
    role: {type: String, required: true}
});

user.statics.checkExists = async function (email, phoneNumber) {
    const exists = await this.exists({$or: [{email}, {phoneNumber}]});

    return exists;
}

user.statics.hashPassword = async function (password) {
    let hash = await bcrypt.hash(password, 12);
    console.log(hash);

    return hash;
}

user.statics.comparePassword = async function (email, attemptedPassword) {
    let user = await this.findOne({email});

    if (!user) {
        return false;
    }

    let result = await bcrypt.compare(attemptedPassword, user.password);

    return result;
}

module.exports = model('users', user)