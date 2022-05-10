const router = require("express").Router();
const { sendMessage } = require("../../services/rabbit");
const stockTable = require("./table");

router.post("/", async (req, res) => {
	const { name, id, batch, manufacturingDate, expiringDate, origin, amount } =
		req.body;

	try {
		sendMessage(req.baseUrl, "POST", req.body, req.params, req.query, res);
		// stockTable.create(req.body);
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

// Read
router.get("/", async (req, res) => {
	sendMessage(req.baseUrl, "GET", req.body, req.params, req.query);
	try {
		const package = await stockTable.list();
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

// Read
router.get("/:id", async (req, res) => {
	const id = req.params.id;
	sendMessage(req.baseUrl, "GET", req.body, req.params, req.query);

	try {
		const package = await stockTable.find(id);

		if (!package) {
			res.status(422).json({ message: "Usuário não encontrado!" });
			return;
		}

		res.status(200).json(package);
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

// Update
router.put("/:id", async (req, res) => {
	const { id: _id } = req.params;
	const { entry } = req.query;
	const { name, batch, manufacturingDate, expiringDate, origin, amount } =
		req.body;
	try {
		sendMessage(req.baseUrl, "PUT", req.body, req.params, req.query);
		res.status(200).json({ message: "Atualizado com sucesso" });
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

// Delete
router.delete("/:id", async (req, res) => {
	const id = req.params.id;

	try {
		sendMessage(req.baseUrl, "DELETE", req.body, req.params, req.query);
		// 	const package = await stockTable.remove(id);

		// 	if (!package) {
		// 		res.status(422).json({ message: "Pacote não encontrado!" });
		// 		return;
		// 	}

		res.status(200).json({ message: "Pacote removido com sucesso!" });
	} catch (error) {
		// 	res.status(500).json({ erro: error });
	}
});

module.exports = router;
