const express = require("express");
const mongoose = require("mongoose");
const productsRoutes = require("./routes/stock");
const shelfRoutes = require("./routes/shelf");
const transferRoutes = require("./routes/transfers");
const app = express();

app.use(
	express.urlencoded({
		extended: true,
	}),
);

app.use(express.json());
app.use("/stock", productsRoutes);
app.use("/shelf", shelfRoutes);
app.use("/transfer", transferRoutes);

const credentials = {
	user: "root",
	password: "vAECqPQIanQb5qOj",
	db: "cluster0.8bf5t",
};

mongoose
	.connect(
		`mongodb+srv://${credentials.user}:${credentials.password}@${credentials.db}.mongodb.net/RCA?retryWrites=true&w=majority`,
	)
	.then(() => {
		console.log("Conectou ao banco!");
		app.listen(3000);
	})
	.catch((err) => console.log(err));

//s8q66edB33B1AGIi
