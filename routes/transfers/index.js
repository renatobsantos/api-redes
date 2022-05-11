const router = require("express").Router();
const transferTable = require("./table");
const { sendMessage } = require("../../services/rabbit");

router.get("/", async (req, res) => {
	try {
		sendMessage(req.baseUrl, "GET", req.body, req.params, req.query, res);
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		sendMessage(req.baseUrl, "GET", req.body, req.params, req.query, res);
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

module.exports = router;
