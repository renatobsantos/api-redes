const router = require("express").Router();
const transferTable = require("./table");

router.get("/", async (req, res) => {
	try {
		const { type, initialDate, endDate } = req.query;
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
