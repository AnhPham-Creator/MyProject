var Users = require('../model/users_model')
var nodemailer = require('nodemailer')
var crypto = require('crypto')
var Tokenmodel = require('../model/tokenrandom_model')

module.exports.register = async (req, res) => {
	try {
		let find = await Users.findOne({ email: req.body.email })
		if(find) {
			return res.status(400).json({
				error: "The email is exits"
			})
		}
		let user = new Users(req.body)
		await user.save()
		// Create a verification token for this user
        let tokenmodel = new Tokenmodel({ userId: user._id, token: crypto.randomBytes(16).toString('hex') })
        tokenmodel.save()
        // Send the email
        var transporter = nodemailer.createTransport({  // config mail server
        	service: 'Gmail',
        	secure: false,
		    requireTLS: true,
        	auth: {
        		user: process.env.GMAIL_USERNAME,
        		pass: process.env.GMAIL_PASSWORD
        	}
        })
        var mailOptions = {  // create object send mail
        	//from: 'no-reply@admin.com',
        	to: user.email,
        	subject: 'Account Verification Token', 
        	text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' 
        	+ req.headers.host + '\/users\/confirmation?id=' + tokenmodel.token + '.\n'
        }

        transporter.sendMail(mailOptions, (err) => {
            if (err) { return res.status(500).send({ msg: err.message }) }
            res.status(200).send('A verification email has been sent to ' + user.email + '.');
        })
	} catch(error) {
		res.json({
			error: error.message
		})
	}
}

module.exports.listUsers = async (req, res) => {
	try {
		let users = await Users.find()
		res.json({
			users: users
		})
	} catch(error) {
		res.json({
			error: error.message
		})
	}
}

module.exports.login = (req, res) => {
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