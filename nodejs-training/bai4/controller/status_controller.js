var Posts = require('../model/posts_model')
var Users = require('../model/users_model')
var Groups = require('../model/groups_model')
var Comments = require('../model/comments_model')
var SubComments = require('../model/subcomment_model')

module.exports.postStatus = async (req, res) => {
	try {
		let data = req.body
		let post = new Posts(data)
		await post.save()
		res.json({
			status: "post success",
			post: post
		})
	} catch(error) {
		res.json({
			error: error.message
		})
	}
}

module.exports.update = async (req, res) => {
	try {
		let statusId = req.body.statusid
		let content = req.body.content
		await Posts.findByIdAndUpdate(statusId, { content: content })
		res.json({
			status: "update success"
		})
	}catch(error) {
		res.json({
			error: error.message
		})
	}
}

module.exports.delete = async (req, res) => {
	try {
		let statusId = req.query.id
		let listcomment = await Comments.find({ postid: statusId })
		for(let comment of listcomment) {
			await SubComments.deleteMany({ commentid: comment._id})
		}
		await Comments.deleteMany({ postid: statusId})
		await Posts.findByIdAndDelete(statusId)
		res.json({
			status: "delete success"
		})
	}catch(error) {
		res.json({
			error: error.message
		})
	}
}

module.exports.showpost = async (req, res) => {
	try {
		let posts = await Posts.find()
		let result = []
		for(let post of posts) {
			let user = await Users.findById(post.userid)
			let group = await Groups.findById(post.groupid)
			console
			let objectPost = {
				username: user.firstname.concat(user.lastname),
				groupname: group.groupname,
				comment: []
			} 
			let comments = await Comments.find({ postid: post._id })
			for(let comment of comments) {
				let subCommnets = await SubComments.find({ commentid: comment._id })
				let objectcomment = {
					content: comment.content,
					subcommnets: subCommnets
				}
				objectPost.comment.push(objectcomment)
			}
			result.push(objectPost)
		}
		res.json({
			post: result
		})
	} catch(error) {
		res.json({
			error: error.message
		})
	}
}