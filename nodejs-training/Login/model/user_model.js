const mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
	firstname: {
		type: String,
		required: [true, 'User firstname required']
	},
	lastname: {
		type: String,
		required: [true, 'User firstname required']
	},
	email: {
		type: String,
		required: [true, 'User firstname required']
	},
	password: {
		type: String,
		required: [true, 'User firstname required']
	},
	fullname: String
})

var Users = mongoose.model('users', userSchema)

module.exports = Users