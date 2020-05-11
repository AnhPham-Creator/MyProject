const mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
	firstname: {
		type: String,
		required: [true, 'User name is required']
	},
	lastname: {
		type: String,
		required: [true, 'User name is required']
	},
	email: {
		type: String,
		required: [true, 'email is required']
	},
	password: {
		type: String,
		required: [true, 'password is required']
	},
	phone: {
		type: String,
		required: [true, 'phone is required']
	},
	isVerified: { type: Boolean, default: false }
}, { timestamps: { createdAt: 'created_at' , updatedAt: 'updated_at' } })

var Users = mongoose.model('users', userSchema)

module.exports = Users