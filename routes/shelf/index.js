const router = require("express").Router();
const stockTable = require("../stock/table");
const shelfTable = require("./table");
const transferTable = require("../transfers/table");
const { sendMessage } = require("../../services/rabbit");

// Update
router.put("/withdrawal", async (req, res) => {
	const { id, amount } = req.body;
	sendMessage(req.baseUrl, "PUT", req.body, req.params, req.query);
	try {
		let package = await stockTable.find(id);
		const delta = package.amount - amount;
		if (delta < 0) {
			res.status(400).json({ message: "Quantidade Invalida!" });
			return;
		}
		package = {
			...package,
			amount: package.amount - amount,
		};
		let shelfProduct = await shelfTable.find(id);
		if (!!shelfProduct) {
			shelfProduct = {
				...shelfProduct,
				amount: shelfProduct.amount + amount,
			};
			await shelfTable.update(id, shelfProduct);
		} else {
			await shelfTable.create({
				...package,
				amount: amount,
			});
		}

		const updatedPackage = await stockTable.update(id, package);
		if (!updatedPackage === 0) {
			res.status(422).json({ message: "Pacote não encontrado!" });
			return;
		}

		delete package.id;
		await transferTable.create({
			...package,
			code: id,
			amount: amount,
			type: 1,
			interactionDate: new Date().toISOString(),
			interactionMillis: new Date().getTime(),
		});
		res.status(200).json({ message: "Produto atualizado!" });
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

router.put("/purchase", async (req, res) => {
	const { id, amount } = req.body;
	sendMessage(req.baseUrl, "PUT", req.body, req.params, req.query);
	try {
		let package = await shelfTable.find(id);
		const delta = package.amount - amount;
		if (delta < 0) {
			res.status(400).json({ message: "Quantidade Invalida!" });
			return;
		}
		package = {
			...package,
			amount: delta,
		};
		await shelfTable.update(id, package);

		delete package.id;
		await transferTable.create({
			...package,
			code: id,
			amount: amount,
			type: 2,
			interactionDate: new Date().toISOString(),
			interactionMillis: new Date().getTime(),
		});
		res.status(200).json({ message: "Atualizado com sucesso" });
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

router.get("/", async (req, res) => {
	try {
		const package = await shelfTable.list();

		res.status(200).json(package);
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

module.exports = router;
