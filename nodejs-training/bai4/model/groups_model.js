const mongoose = require('mongoose')

var groupSchema = new mongoose.Schema({
	groupname: {
		type: String,
		required: [true, 'Group name is required']
	}
}, { timestamps: { createdAt: 'created_at' , updatedAt: 'updated_at' } })

var Groups = mongoose.model('groups', groupSchema)

module.exports = Groups