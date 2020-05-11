var Comments = require('../model/comments_model')
var SubComments = require('../model/subcomment_model')

module.exports.postComment = async (req, res) => {
	try {
		let data = req.body
		let comment = new Comments(data)
		await comment.save()
		res.json({
			status: 'comment success'
		})
	}catch(error) {
		res.json({
			error: error.message
		})
	}
}

module.exports.update = async (req, res) => {
	try {
		let commentId = req.body.commentid
		let content = req.body.content
		await Comments.findByIdAndUpdate(commentid, { content: content })
		res.json({
			status: "update success"
		})
	}catch(error) {
		res.json({
			error: error.message
		})
		console.log(error)
	}
}

module.exports.delete = async (req, res) => {
	try {
		let commentId = req.query.id
		await SubComments.deleteMany({ commentid: commentId})
		await Comments.finByIdAndDelete(commentId)
		res.json({
			status: "delete success"
		})
	} catch(error) {
		res.json({
			error: error.message
		})
	}
}