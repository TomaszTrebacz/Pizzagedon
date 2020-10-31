import got from 'got';

const USERS_SERVICE_URI = 'http://users-service:7100';

export default class UsersService {
	static async createUser({
		email,
		password,
		role,
		name,
		surname,
		street,
		postCode,
		city,
		phoneNumber,
	}) {
		const response = await got
			.post(`${USERS_SERVICE_URI}/user`, {
				json: {
					email,
					password,
					role,
					name,
					surname,
					street,
					postCode,
					city,
					phoneNumber,
				},
			})
			.json();
		return response;
	}

	static async updateUser({ id, name, surname, street, postCode, city, phoneNumber }) {
		const response = await got
			.post(`${USERS_SERVICE_URI}/user/update`, {
				json: {
					id,
					name,
					surname,
					street,
					postCode,
					city,
					phoneNumber,
				},
			})
			.json();
		return response;
	}

	static async updateUserRole({ id, role }) {
		const response = await got
			.post(`${USERS_SERVICE_URI}/user/updateRole`, {
				json: {
					id,
					role,
				},
			})
			.json();
		return response;
	}

	static async loginUser({ email, password }) {
		const response = await got
			.post(`${USERS_SERVICE_URI}/users`, { json: { email, password } })
			.json();
		return response;
	}

	static async fetchUser({ userId }) {
		const response = await got.get(`${USERS_SERVICE_URI}/users/${userId}`).json();
		return response;
	}

	static async fetchRootUser() {
		const response = await got.get(`${USERS_SERVICE_URI}/users/root`).json();
		return response;
	}

	static async fetchAllUsers({ pageNumber, pageSize }) {
		const response = await got.get(`${USERS_SERVICE_URI}/users/${pageNumber}/${pageSize}`).json();
		return response;
	}

	static async countAllUsers() {
		const response = await got.get(`${USERS_SERVICE_URI}/users/count`).json();
		return response;
	}
}
