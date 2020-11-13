const {Schema, model} = require('mongoose');

const order = new Schema({
    orderList: {type: Array, required: true},
    totalPrice: {type: Number, required: true},
    // status: {type: String, required: true}
    //add user address here
},{
    toObject:{
        virtuals: true
    }
});

module.exports = model('orders', order);