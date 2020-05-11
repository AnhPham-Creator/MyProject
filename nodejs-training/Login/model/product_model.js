const mongoose = require('mongoose')

var productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Product Name required']
	},
	price: {
		type: Number,
		required: [true, 'Product price required']
	},
	quantity:{
		type: Number,
		required: [true, 'Product quantity required']
	}
})

var Products = mongoose.model('products', productSchema)
module.exports = Products