const model = require("../../models/stock");

module.exports = {
	async find(id) {
		const result = await model.findOne({
			where: {
				id,
			},
			raw: true,
		});
		if (!result) {
			throw new Error("Não encontrado");
		} else {
			return result;
		}
	},
	update(id, data) {
		return model.update(data, {
			where: {
				id,
			},
		});
	},
	create(data) {
		return model.create(data);
	},
	list() {
		return model.findAll();
	},
	remove(id) {
		return model.destroy({
			where: {
				id,
			},
		});
	},
};
