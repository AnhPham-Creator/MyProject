const Sequelize = require('sequelize')
const sequelize = require('../connection')
const Model = Sequelize.Model
class Orders extends Model {}
Orders.init({
	userid: {
		type: Sequelize.STRING,
		allowNull: true,
		references: {
	      model: "tbl_users",
	      key: "userid"
	    }
	},
	productid: {
		type: Sequelize.STRING,
		allowNull: true,
		references: {
	      model: "tbl_products",
	      key: "productid"
	    }
	},
	quantity: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	price: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	status: {
		type: Sequelize.STRING
	}
}, 
{ sequelize, modelName: 'tbl_orders' })

module.exports = Orders
