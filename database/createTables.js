const stockModel = require("../models/stock");
const shelfModel = require("../models/shelf");

const createTables = async () => {
	stockModel
		.sync()
		.then(() => console.log("Tabelas Criadas"))
		.catch();
	shelfModel
		.sync()
		.then(() => console.log("Tabelas Criadas"))
		.catch();
};

createTables();
