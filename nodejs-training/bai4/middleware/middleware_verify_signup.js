var Tokenmodel = require('../model/tokenrandom_model.js')
var Users = require('../model/users_model')
var nodemailer = require('nodemailer')
var crypto = require('crypto')

module.exports.verifySignup = async (req, res, next) => {
    try {
        let findtoken = await Tokenmodel.findOne({ token: req.query.id })
        if (!findtoken) {
            return res.status(400).send({ 
                type: 'not-verified', 
                msg: 'We were unable to find a valid token. Your token my have expired.' 
            })
        }
        // If we found a token, find a matching user
        let finduser = await Users.findOne({ _id: findtoken.userId })
        if(!finduser) {
            return res.status(400).send({ 
                msg: 'We were unable to find a user for this token.' 
            })
        }
        if(finduser.isVerified) {
            return res.status(400).send({ 
                type: 'already-verified', 
                msg: 'This user has already been verified.' 
            })
        }
        // Verify and update isVerified the user
        await Users.replaceOne({ _id: finduser.userId }, { isVerified: true })
        res.status(200).json({
            status: "The account has been verified. Please log in."
        })
    } catch(error) {
        res.status(400).json({
            error: error.message
        })
    }
}

module.exports.resendToken = async (req, res, next) => {
    try {
        let user = await Users.findOne({ email: req.body.email })
        if(!user) {
            return res.status(400).json({
                error: "The email is not exits"
            })
        }

        let tokenmodel = new Tokenmodel({ 
            userId: user._id, 
            token: crypto.randomBytes(16).toString('hex') 
        })
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
            if (err) { 
                return res.status(500).send({ msg: err.message }) 
            }
            res.status(200).send('A verification email has been sent to ' + user.email + '.');
        })
    } catch(error) {
        res.json({
            error: error.message
        })
    }
}

module.exports.checktokenlogin = (req, res, next) => {
    try{
        const token = req.headers.authorization
        const token = req.query.token
        if(!token) {
            return res.status(400).json({
                errors: "Invalid value supplied"
            })
        }
        // Xác thực token
        jwt.verify(token, tokenKey, (err, payload) => {
            if(payload) {
                req.user = payload
                next()
            } else {
                // Nếu token tồn tại nhưng không hợp lệ, server sẽ response status code 401 với msg bên dưới
                return res.status(400).json({
                    errors: "Unathourized"
                })
            }
        })
    } catch(error) {
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
    res.status(400).json({
        errors: "not authorized"
    })
}