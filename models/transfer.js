const mongoose = require("mongoose");

const instance = mongoose.model("transfers", {
	name: String,
	code: String,
	type: Number,
	batch: String,
	manufacturingDate: String,
	expiringDate: String,
	origin: String,
	amount: Number,
	interactionDate: String,
	interactionMillis: Number,
});

module.exports = instance;
