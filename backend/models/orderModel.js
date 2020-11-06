const {Schema, model} = require('mongoose');

const order = new Schema({
    products: {type: Array, required: true},
    totalPrice: {type: Number, required: true},
    stockAvailability: {type: Number, required: true},
    
},{
    toObject:{
        virtuals: true
    }
});

module.exports = model('orders', order);