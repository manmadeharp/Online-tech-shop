const {Schema, model} = require('mongoose');

const order = new Schema({
    orderList: {type: Array, required: true},
    totalPrice: {type: Number, required: true},
    orderNumber: {type: String, required: true},
    email: {type:String, required: true},
    status: {type:String, required:true}
    // status: {type: String, required: true}
    //add user address here
},{
    toObject:{
        virtuals: true
    }
});

order.statics.checkExists = async function (email) {
    const exists = await this.exists({email: email});

    return exists;
}

module.exports = model('orders', order);