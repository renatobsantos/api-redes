const router = require("express").Router();
const stockTable = require("../stock/table");
const shelfTable = require("./table");

// Update
router.put("/withdrawal", async (req, res) => {
	const { id, amount } = req.body;

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
		console.log(shelfProduct);
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
		res.status(200).json({ message: "Produto atualizado!" });
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

router.put("/purchase", async (req, res) => {
	const { id, amount } = req.body;

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
