const Sequelize = require("sequelize");

const instance = new Sequelize("api_redes", "root", "1812", {
	host: "127.0.0.1",
	dialect: "mysql",
});

module.exports = instance;
