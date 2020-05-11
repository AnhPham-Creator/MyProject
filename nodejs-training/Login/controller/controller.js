const jwt = require('jsonwebtoken')
const { tokenKey } = require('../key')
var Users = require('../model/user_model')
var Product = require('../model/product_model')
var Order = require('../model/order_model')
var Cart = require('../model/cart_model')
var axios = require('axios')
var localStorage = require('local-storage')
var mongoose = require('mongoose')
var dateFormat = require('dateformat')
var ObjectId = mongoose.Types.ObjectId
module.exports.Viewlogin = (req, res) => {
	res.render('login')
}

module.exports.login = async (req, res, next) => {
	try{
		let email = req.body.email
		let password = req.body.password

		let datalogin = await Users.findOne({ email: email })
		if(!datalogin){
			res.status(400).json({
				errors: "email not exist"
			})
			return
		}

		if(datalogin.password !== password){
			res.status(400).json({
				errors: "password incorrect"
			})
			return
		}
		// Tạo 1 token và payload data và response lại với status code là 200 cùng với payloaded data
		// tg het han cua 1 token expiresIn
	    const token = jwt.sign({ userId: datalogin.id }, tokenKey, { expiresIn: 60 * 60 })
	    //req.headers.authorization = token
	    localStorage.set('tokenKey', {
	    	userid: datalogin.id,
	    	token: token
	    })
		//res.redirect('/list-product')
		res.status(200).json({
			token: token,
			user: datalogin
		})
	}
	catch(error){
		res.json({
			errors: error
		})
	}	
}

module.exports.success = (req, res) => {
	//console.log(req.headers.authorization)
	res.render('pagehome')
}

module.exports.swagger = (req, res) => {
	//console.log(req.headers.authorization)
	res.render('dist/index')
}

module.exports.pagehome = (req, res) => {
	res.render('pagehome')
}

module.exports.error = (req, res) => {
	res.render('error')
}

module.exports.logout = (req, res) => {
	localStorage.clear()
	res.send('logout success')
}

module.exports.getlistproduct = async (req, res) => {
	try{
		let listproduct = await Product.find()
		// let userLogin = localStorage.get('tokenKey')
		// let token = req.body.token
		// if(!userLogin || !token) {
		// 	//res.redirect('/login')
		// 	res.status(400).json({
		// 		errors: "Invalid value supplied"
		// 	})
		// 	return
		// }
		let param = req.query.id
		let deleteid = req.query.deleteid
		if(deleteid) {
			let cartDetail = await Cart.findOne({  _id: deleteid })
			if(cartDetail.quantity === 1) {
				Cart.deleteOne({ _id: cartDetail._id }, (err) => {
					if(err){
						//res.send('delete err', err)
						res.status(400).json({
							errors: err
						})
						return
					}
				})
			}else {
				Cart.update({ _id: cartDetail._id }, {quantity: cartDetail.quantity - 1}, (err) => {
					if(err){
						//res.send('update err', err)
						res.status(400).json({
							errors: err
						})
						return
					}
				})
			}
		}
		if(param) {
			let cartDetail = await Cart.findOne({userid: userLogin.userid, productid: param})
			if(cartDetail) {
				let data = {
					quantity: cartDetail.quantity + 1
				}
				Cart.update({ _id: cartDetail._id },data, (err) => {
					if(err){
						//res.send('update err', err)
						res.status(400).json({
							errors: err
						})
					}
				})
			} else {
				let dataProduct = await Product.findById( { _id: param} )
				let newProductCart = new Cart({
					userid: userLogin.userid,
					productid: param,
					productname: dataProduct.name,
					price: dataProduct.price,
					quantity: 1,
					flag: true
				})
				await newProductCart.save()
			}
		}
		// let listCart = await Cart.find({userid : userLogin.userid, flag : true})
		// let totalPrice = 0
		// if(listCart.length) {
		// 	totalPrice = listCart.map((cart) => {
		// 		return cart.price * cart.quantity
		// 	}).reduce((x,y) => {
		// 		return x + y
		// 	})
		// }
		// res.render('../views/product', {
		// 	listproduct: listproduct,
		// 	listCart: listCart,
		// 	totalPrice: totalPrice
		// })
		res.status(200).json({
			listproduct: listproduct,
		})
	}catch(error) {
		res.status(400).json({
			errors: error
		})
	}
}

module.exports.makeOrder = async (req, res) => {
	let userLogin = localStorage.get('tokenKey')
	let dataOrders = req.body
	if(!userLogin) {
			//res.redirect('/login')
			res.status(401).json({
				errors: "Unauthorized"
			})
			return
	}
	//let totalPrice = req.body.totalPrice
	//let cartDetail = await Cart.find({userid: userLogin.userid, flag: true})
	var now  = new Date();
    dateFormat(now, "isoDateTime")
	if(dataOrders) {
		for(dataOrder of dataOrders) {
			dataOrder.dateorder = JSON.stringify(now)
			let dataNew = new Order(dataOrder)
			await dataNew.save((err) => {
				if(err){
					res.status(400).json({
						errors: err
					})
					return
				}

			})
		}
		res.status(200).json({
			status: "Order success"
		})
	}
}