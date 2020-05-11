var Groups = require('../model/groups_model')

module.exports.createGroup = async(req, res) => {
	try {
		let data = req.body
		let group = new Groups(data)
		await group.save()
		res.json({
			status: "Create success",
			group: group
		})
	} catch(error) {
		res.json({
			error: error.message
		})
	}
}

module.exports.update = async (req, res) => {
	try {
		let groupId = req.body.groupid
		let groupName = req.body.groupname
		let groupFind = await Groups.findByIdAndUpdate(groupId, { groupname: groupName })
		res.json({
			status: 'update success',
			group: groupFind
		})
	}catch(error) {
		res.json({
			error: error.message
		})
	}
}

module.exports.delete = async (req, res) => {
	try {
		let groupId = req.query.id
		await Groups.findByIdAndDelete(groupId)
		res.json({
			status: "delete success"
		})
	}catch(error) {
		res.json({
			error: error.message
		})
	}
}