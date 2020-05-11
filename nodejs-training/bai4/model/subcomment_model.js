const mongoose = require('mongoose')
var Schema = mongoose.Schema

var subcommentSchema = new Schema({
	commentid: {
		type: Schema.Types.ObjectId, 
		ref: 'comments',
		required: [true, 'comment id is required']
	},
	content: {
		type: String,
		required: [true, 'content is required']
	}
}, { timestamps: { createdAt: 'created_at' , updatedAt: 'updated_at' } })

var Subcomments = mongoose.model('subcomments', subcommentSchema)

module.exports = Subcomments