const router = require("express").Router();
const { sendMessage } = require("../../services/rabbit");
const stockTable = require("./table");

router.post("/", async (req, res) => {
	const { name, id, batch, manufacturingDate, expiringDate, origin, amount } =
		req.body;
	sendMessage(req.baseUrl, "POST", req.body, req.params, req.query);

	try {
		stockTable.create(req.body);
		res.status(200).json(req.body);
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

// Read
router.get("/", async (req, res) => {
	sendMessage(req.baseUrl, "GET", req.body, req.params, req.query);
	try {
		const package = await stockTable.list();
		res.status(200).json(package);
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
	sendMessage(req.baseUrl, "PUT", req.body, req.params, req.query);
	try {
		let updatedPackage;
		if (!!entry) {
			let package = await stockTable.find(_id);
			package = {
				amount: req.body.amount + package.amount,
			};
			updatedPackage = await stockTable.update(_id, package);
		} else {
			updatedPackage = await stockTable.update(_id, req.body);
		}
		if (!updatedPackage === 0) {
			res.status(422).json({ message: "Pacote não encontrado!" });
			return;
		}
		res.status(200).json({ message: "Atualizado com sucesso" });
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

// Delete
router.delete("/:id", async (req, res) => {
	const id = req.params.id;
	sendMessage(req.baseUrl, "DELETE", req.body, req.params, req.query);

	try {
		const package = await stockTable.remove(id);

		if (!package) {
			res.status(422).json({ message: "Pacote não encontrado!" });
			return;
		}

		res.status(200).json({ message: "Pacote removido com sucesso!" });
	} catch (error) {
		res.status(500).json({ erro: error });
	}
});

module.exports = router;
