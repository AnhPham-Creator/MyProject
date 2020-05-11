const Sequelize = require('sequelize')
const sequelize = require('../connection')
const Model = Sequelize.Model
class Users extends Model {}
Users.init({
	userid: {
		type: Sequelize.STRING,
		allowNull: true,
		unique: true
	},
	firstname: {
		type: Sequelize.STRING,
		allowNull: false
	},
	lastname: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false
	},
	pass: {
		type: Sequelize.STRING,
		allowNull: false
	}
}, 
{ sequelize, modelName: 'tbl_users' })

module.exports = Users
