const router = require("express").Router();
const stockTable = require("../stock/table");
const shelfTable = require("./table");
const transferTable = require("../transfers/table");
const { sendMessage } = require("../../services/rabbit");

// Update
router.put("/withdrawal", async (req, res) => {
	try {
		sendMessage(req.baseUrl, "PUT", req.body, req.params, req.query, res);
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

router.put("/purchase", async (req, res) => {
	try {
		sendMessage(req.baseUrl, "PUT", req.body, req.params, req.query, res);
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

router.get("/:id", async (req, res) => {
	try {
		sendMessage(req.baseUrl, "GET", req.body, req.params, req.query, res);
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

router.get("/", async (req, res) => {
	try {
		sendMessage(req.baseUrl, "GET", req.body, req.params, req.query, res);
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

module.exports = router;
