const Sequelize = require('sequelize')
const sequelize = require('../connection')
const Model = Sequelize.Model
class Products extends Model {}
Products.init({
	productid: {
		type: Sequelize.STRING,
		allowNull: true,
		unique: true
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	quantity: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	price: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	description: {
		type: Sequelize.STRING
	}
}, 
{ sequelize, modelName: 'tbl_products' })

module.exports = Products
