const mongoose = require('mongoose')
const Schema = mongoose.Schema

var orderSchema = new Schema({
	userid: {
		type: Schema.Types.ObjectId, 
		ref: 'users',
		required: [true, 'User id required']
	},
	productid: {
		type: Schema.Types.ObjectId, 
		ref: 'products',
		required: [true, 'Product id required']
	},
	price:{
		type: Number,
		required: [true, 'Product price required']
	},
	quantity:{
		type: Number,
		required: [true, 'Product quantity required']
	},
	dateorder:{
		type: String,
		required: [true, 'Product sumprice required']
	}
})

var Order = mongoose.model('order', orderSchema)
module.exports = Order