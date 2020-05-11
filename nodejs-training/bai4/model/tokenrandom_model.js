const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tokenSchema = Schema({
    userId: { 
    	type: Schema.Types.ObjectId,
    	required: true, 
    	ref: 'users'
    },
    token: { 
    	type: String, 
    	required: true 
    },
    createdAt: { 
    	type: Date, 
    	required: true, 
    	default: Date.now, 
    	expires: 43200 
    }
})

var Tokens = mongoose.model('tokens', tokenSchema)

module.exports = Tokens