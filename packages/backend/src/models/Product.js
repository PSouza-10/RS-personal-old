const { Schema, model } = require('mongoose')

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 33
    },
    unit: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    categories: {
        type: [String],
        required: true
    },
    image: {
        type: String,
        default: 'https://previews.123rf.com/images/val2014/val20141603/val2014160300006/54302308-shopping-cart-icon.jpg'
    }

})


module.exports = model('Product', ProductSchema)