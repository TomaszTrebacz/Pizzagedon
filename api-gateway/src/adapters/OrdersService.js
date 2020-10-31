import got from 'got';

const ORDERS_SERVICE_URI = 'http://orders-service:7102';

export default class OrdersService {
	static async fetchOrder({ id }) {
		const response = await got.get(`${ORDERS_SERVICE_URI}/orders/${id}`).json();
		return response;
	}

	static async fetchAllOrders() {
		const response = await got.get(`${ORDERS_SERVICE_URI}/orders`).json();
		return response;
	}

	static async fetchAllCurrentOrders({ pageNumber, pageSize }) {
		const response = await got
			.get(`${ORDERS_SERVICE_URI}/orders/current/${pageNumber}/${pageSize}`)
			.json();
		return response;
	}

	static async fetchAllToDeliverOrders({ pageNumber, pageSize }) {
		const response = await got
			.get(`${ORDERS_SERVICE_URI}/orders/toDeliver/${pageNumber}/${pageSize}`)
			.json();
		return response;
	}

	static async fetchAllToCookOrders({ pageNumber, pageSize }) {
		const response = await got
			.get(`${ORDERS_SERVICE_URI}/orders/toCook/${pageNumber}/${pageSize}`)
			.json();
		return response;
	}

	static async fetchAllToAcceptOrders({ pageNumber, pageSize }) {
		const response = await got
			.get(`${ORDERS_SERVICE_URI}/orders/toAccept/${pageNumber}/${pageSize}`)
			.json();
		return response;
	}

	static async countToAccept() {
		const response = await got.get(`${ORDERS_SERVICE_URI}/orders/toAccept/count`).json();
		return response;
	}

	static async countToCook() {
		const response = await got.get(`${ORDERS_SERVICE_URI}/orders/toCook/count`).json();
		return response;
	}

	static async countToDeliver() {
		const response = await got.get(`${ORDERS_SERVICE_URI}/orders/toDeliver/count`).json();
		return response;
	}

	static async fetchAllFinishedOrders({ pageNumber, pageSize }) {
		const response = await got
			.get(`${ORDERS_SERVICE_URI}/orders/finished/${pageNumber}/${pageSize}`)
			.json();
		return response;
	}

	static async countCurrentOrders() {
		const response = await got.get(`${ORDERS_SERVICE_URI}/orders/current/count`).json();
		return response;
	}

	static async countCurrentUserOrders({ userId }) {
		const response = await got.get(`${ORDERS_SERVICE_URI}/orders/count/current/${userId}`).json();
		return response;
	}

	static async countFinishedOrders() {
		const response = await got.get(`${ORDERS_SERVICE_URI}/orders/finished/count`).json();
		return response;
	}

	static async fetchCurrentUserOrders({ userId, pageNumber, pageSize }) {
		const response = await got
			.get(`${ORDERS_SERVICE_URI}/orders/current/${userId}/${pageNumber}/${pageSize}`)
			.json();
		return response;
	}

	static async fetchFinishedUserOrders({ userId, pageNumber, pageSize }) {
		const response = await got
			.get(`${ORDERS_SERVICE_URI}/orders/finished/${userId}/${pageNumber}/${pageSize}`)
			.json();
		return response;
	}

	static async countFinishedUserOrders({ userId }) {
		const response = await got.get(`${ORDERS_SERVICE_URI}/orders/count/finished/${userId}`).json();
		return response;
	}

	static async createOrder({ userId, content, total, phoneNumber, street, postCode, city }) {
		const response = await got
			.post(`${ORDERS_SERVICE_URI}/orders`, {
				json: { userId, content, total, phoneNumber, street, postCode, city },
			})
			.json();
		return response;
	}

	static async setAccepted({ id }) {
		const response = await got
			.post(`${ORDERS_SERVICE_URI}/orders/setAccepted`, {
				json: { id },
			})
			.json();
		return response;
	}

	static async setCooked({ id }) {
		const response = await got
			.post(`${ORDERS_SERVICE_URI}/orders/setCooked`, {
				json: { id },
			})
			.json();
		return response;
	}

	static async setDelivered({ id }) {
		const response = await got
			.post(`${ORDERS_SERVICE_URI}/orders/setDelivered`, {
				json: { id },
			})
			.json();
		return response;
	}
}
