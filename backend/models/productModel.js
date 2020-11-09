const {Schema, model} = require('mongoose');

const product = new Schema({
    category: {type: String, required: true},
    name: {type: String, required: true},
    price: {type: Number, required: true},
    stockAvailability: {type: Number, required: true},
},{
    toObject:{
        virtuals: true
    }
});


product.statics.checkExists = async function (name) {
    const exists = await this.exists({$or: [{name}]});

    return exists;
}

module.exports = model('products', product);