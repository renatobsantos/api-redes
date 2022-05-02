const router = require("express").Router();
const transferTable = require("./table");
const { sendMessage } = require("../../services/rabbit");

router.get("/", async (req, res) => {
	try {
		const { type, initialDate, endDate } = req.query;
		sendMessage(req.baseUrl, "GET", req.body, req.params, req.query);
		let transfers;
		if (type !== undefined && initialDate === undefined) {
			transfers = await transferTable.findType(type);
		} else if (initialDate !== undefined && endDate !== undefined) {
			transfers = await transferTable.findPeriod(
				new Date(initialDate).getTime(),
				new Date(endDate).getTime(),
				type,
			);
		} else {
			transfers = await transferTable.list();
		}

		res.status(200).json(transfers);
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

router.delete("/:id", async (req, res) => {
	const id = req.params.id;
	sendMessage(req.baseUrl, "DELETE", req.body, req.params, req.query);

	try {
		const package = await transferTable.remove(id);

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
