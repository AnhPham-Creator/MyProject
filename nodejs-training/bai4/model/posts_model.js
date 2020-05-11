const mongoose = require('mongoose')
const Schema = mongoose.Schema

var postSchema = new Schema({
	userid: {
		type: Schema.Types.ObjectId, 
		ref: 'users',
		required: [true, 'Group name is required']
	},
	groupid: {
		type: Schema.Types.ObjectId, 
		ref: 'groups',
		required: [true, 'date create is required']
	},
	content: {
		type: String,
		required: [true, 'content is required']
	}
}, { timestamps: { createdAt: 'created_at' , updatedAt: 'updated_at' } })

var Posts = mongoose.model('posts', postSchema)

module.exports = Posts