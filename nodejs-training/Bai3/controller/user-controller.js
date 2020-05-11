const Users = require('../model/users')
const Products = require('../model/products')
const Orders = require('../model/orders')
module.exports.pagehome = async (req, res) => {
	let users = await Users.findAll()
	res.json({
		users: users
	})
}

module.exports.register = async (req, res) => {
	let data = req.body
	if(Object.keys(data).length) {
		try{
			let userid = 'userid_'
			let user = await Users.create(data)
			userid = userid.concat(user.id.toString())
			await Users.update({ userid: userid}, {
				where: {
					id: user.id
				}
			})
			res.status(200).json({
				status: 'register success'
			})
			return
		}catch(error) {
			res.status(400).json({
				error: error
			})
		}
	}
	res.status(400).json({
		error: "input value invaild"
	})
}

module.exports.addProduct = async (req, res) => {
	let data = req.body
	if(Object.keys(data).length) {
		try {
			let productid = 'productid_'
			let product = await Products.create(data)
			productid = productid.concat(product.id.toString())
			await Products.update({ productid: productid }, {
				where: {
					id: product.id
				}
			})
			res.status(200).json({
				status: 'add product success'
			})
			return
		} catch(error) {
			res.status(400).json({
				error: error
			})
		}
	}
	res.status(400).json({
		error: "input value invaild"
	})
}

module.exports.getListProducts = async (req, res) => {
	try {
		let list = await Products.findAll()
		res.status(200).json({
			products: list
		})
	} catch(error) {
		res.status(400).json({
			error: error
		})
	}
}

module.exports.makeOrders = async (req, res) => {
	try {
		let data = req.body
		let order = await Orders.create(data)
		res.status(200).json({
			status: 'Order success',
			order: order
		})
	}catch(error) {
		res.status(400).json({
			error: error
		})
	}
}

module.exports.deleteuser = async (req, res) => {
	try {
		let id = req.query.userid
		await Users.destroy({
			where: {
				userid: id
			}
		})
		res.status(200).json({
			status: 'delete success',
		})
	} catch(error) {
		res.status(400).json({
			error: error
		})
	}
}