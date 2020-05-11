const mongoose = require('mongoose')
const Schema = mongoose.Schema

var cartSchema = new Schema({
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
	productname: {
		type: String,
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
	flag:{
		type: Boolean,
		required: [true, 'Flag required']
	}
})

var Cart = mongoose.model('carts', cartSchema)
module.exports = Cart