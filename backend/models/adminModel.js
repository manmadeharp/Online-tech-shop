const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const admin = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phoneNumber: {type: String, required: false, unique: true},
    password: {type: String, required: true},
    addressName: {type: String, required: true}, 
    addressNumber: {type: String, required: true}, 
    postcode: {type: String, required: true}, 
    city: {type: String, required: true}, 
    country: {type: String, required: true},
    role: {type: String, required: true}
});

admin.statics.checkExists = async function (email, phoneNumber) {
    const exists = await this.exists({$or: [{email}, {phoneNumber}]});

    return exists;
}

admin.statics.hashPassword = async function (password) {
    let hash = await bcrypt.hash(password, 12);
    console.log(hash);

    return hash;
}

admin.statics.comparePassword = async function (email, attemptedPassword) {
    let admin = await this.findOne({email});

    if (!admin) {
        return false;
    }

    let result = await bcrypt.compare(attemptedPassword, admin.password);

    return result;
}

module.exports = model('admins', admin)