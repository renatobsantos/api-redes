const express = require("express");
const mongoose = require("mongoose");
const productsRoutes = require("./routes/stock");
const shelfRoutes = require("./routes/shelf");
const app = express();

app.use(
	express.urlencoded({
		extended: true,
	}),
);

app.use(express.json());
app.use("/stock", productsRoutes);
app.use("/shelf", shelfRoutes);

app.listen(3000, () => console.log("API RUNNING PORT 3000"));

// mongoose
// 	.connect(
// 		"mongodb+srv://renato:s8q66edB33B1AGIi@api-redes.5keya.mongodb.net/RCA?retryWrites=true&w=majority",
// 	)
// 	.then(() => {
// 		console.log("Conectou ao banco!");
// 		app.listen(3000);
// 	})
// 	.catch((err) => console.log(err));

//s8q66edB33B1AGIi
