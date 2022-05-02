var amqp = require("amqplib/callback_api");

const sendMessage = (endpoint, method, body, params, query) => {
	amqp.connect("amqp://localhost", function (error0, connection) {
		if (error0) {
			throw error0;
		}
		connection.createChannel(function (error1, channel) {
			if (error1) {
				throw error1;
			}
			var queue = "api-redes";
			var msg = {
				endpoint: endpoint,
				method: method,
				body: body,
				params: params,
				query: query,
			};
			channel.assertQueue(queue, {
				durable: false,
			});
			const jsonMessage = JSON.stringify(msg);
			channel.sendToQueue(queue, Buffer.from(jsonMessage));
			console.log(" [x] Sent %s", msg);
		});
		setTimeout(function () {
			connection.close();
		}, 500);
	});
};

module.exports = { sendMessage };
