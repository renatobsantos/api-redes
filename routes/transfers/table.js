const model = require("../../models/transfer");

module.exports = {
	async find(id) {
		const result = await model.findOne({
			id: id,
		});
		if (!result) {
			throw new Error("Não encontrado");
		} else {
			return result;
		}
	},
	create(data) {
		return model.create(data);
	},
	list() {
		return model.find({});
	},
	async findType(type) {
		const result = await model.find({
			type: type,
		});
		if (!result) {
			throw new Error("Não encontrado");
		} else {
			return result;
		}
	},
	async findPeriod(initial, end, type) {
		const result = await model.find({ type: type });
		if (!result) {
			throw new Error("Não encontrado");
		} else {
			const treatedResult = result.filter(
				(item) =>
					item.interactionMillis >= initial && item.interactionMillis <= end,
			);
			return treatedResult;
		}
	},
	remove(id) {
		return model.destroy({
			where: {
				id,
			},
		});
	},
};
