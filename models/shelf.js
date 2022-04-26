const Sequelize = require("sequelize");
const instance = require("../database/index");

const cols = {
	id: {
		type: Sequelize.STRING,
		allowNull: false,
		primaryKey: true,
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	batch: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	manufacturingDate: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	expiringDate: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	origin: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	amount: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
};

const options = {
	freezeTableName: true,
	tableName: "shelf",
	timestamp: true,
	createdAt: "createdAt",
	updatedAt: "updatedAt",
};

module.exports = instance.define("shelf", cols, options);
