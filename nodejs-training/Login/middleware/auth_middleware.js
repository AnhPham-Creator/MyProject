const jwt = require('jsonwebtoken')
const { tokenKey } = require('../key')
var localStorage = require('local-storage')

module.exports.checktoken = (req, res, next) => {
	try{
		//const token = req.headers.authorization
		// const tokenLogin = localStorage.get('tokenKey')
		// const token = tokenLogin.token
		const token = req.query.token
		if(!token) {
			//res.redirect('/login')
			res.status(400).json({
				errors: "Invalid value supplied"
			})
			return
		}
		// Xác thực token
		jwt.verify(token, tokenKey, (err, payload) => {
			if(payload) {
				req.user = payload
				next()
			} else {
				// Nếu token tồn tại nhưng không hợp lệ, server sẽ response status code 401 với msg bên dưới
				// res.send('Unathourized')
				//res.redirect('/login')
				res.status(400).json({
					errors: "Unathourized"
				})
				return
			}
		})
	} catch(error) {
		// res.send('/error', res.json({
		// 	error: error
		// }))
		res.status(400).json({
			errors: error
		})
	}
}

module.exports.checkUser = (req, res, next) => {
	// Nếu req.user tồn tại nghĩa là token cũng tồn tại
	if(req.user) {
		return next();
	}
	//res.redirect('/login')
	res.status(400).json({
		errors: "not authorized"
	})
}