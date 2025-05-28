const mongoose = require('mongoose')

let ProductSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productImage: { type: String, required: true },
    productQuantity: { type: Number, required: true },
    date_created: { type: String, default: Date.now() }
})
let ProductModel = mongoose.model('products', ProductSchema)


module.exports = ProductModel