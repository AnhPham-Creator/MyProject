const mongoose = require('mongoose')
const Schema = mongoose.Schema

var commentSchema = new Schema({
	postid: {
		type: Schema.Types.ObjectId, 
		ref: 'posts',
		required: [true, 'post id is required']
	},
	content: {
		type: String,
		required: [true, 'content is required']
	}
}, { timestamps: { createdAt: 'created_at' , updatedAt: 'updated_at' } })

var comments = mongoose.model('comments', commentSchema)

module.exports = comments