const express = require("express");
const productsRoutes = require("./routes/stock");
const shelfRoutes = require("./routes/shelf");
const transferRoutes = require("./routes/transfers");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use((req, res, prox) => {
	let requestedType = req.header("Accept");

	if (requestedType === "*/*") {
		requestedType = "application/json";
	}

	res.setHeader("Content-Type", "application/json");
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE",
	);
	res.setHeader("Access-Control-Allow-Credentials", true);
	res.setHeader("Access-Control-Allow-Headers", [
		"Origin",
		"Content-Type",
		"X-Auth-Token",
	]);

	prox();
});

app.use("/stock", productsRoutes);
app.use("/shelf", shelfRoutes);
app.use("/transfer", transferRoutes);

app.use((err, req, res, prox) => {
	res.status(400).send(err);
});

app.listen(4000, () => console.log("API RUNNING PORT 4000"));
