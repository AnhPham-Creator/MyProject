var SubComments = require('../model/subcomment_model')

module.exports.postSubcomment =  async (req, res) => {
	try {
		let data = req.body
		let subcomment = new SubComments(data)
		await subcomment.save()
		res.json({
			status: "rep comment success",
			comment: subcomment
		})
	} catch(error) {
		res.json({
			error: error.message
		})
	}
}

module.exports.update = async (req, res) => {
	try {
		let subCommentId = req.body.subcommentid
		let content = req.body.content
		await SubComments.findByIdAndUpdate(subCommentId, { content: content })
		res.json({
			status: "update success"
		})
	} catch(error) {
		res.json({
			error: error.message
		})
	}
}

module.exports.delete = async (req, res) => {
	try {
		let subCommentId = req.query.id
		await SubComments.findByIdAndDelete(subCommentId)
		res.json({
			status:"delete success"
		})
	} catch(error) {
		res.json({
			error: error.message
		})
	}
}