import got from 'got';
import axios from 'axios';

const PRODUCTS_SERVICE_URI = 'http://products-service:7101';

export default class ProductsService {
	static async createProduct({ categoryId, name, description, price, imageUrl }) {
		const response = await got
			.post(`${PRODUCTS_SERVICE_URI}/products`, {
				json: { categoryId, name, description, price, imageUrl },
			})
			.json();
		return response;
	}

	static async createProductCategory({ name, iconName }) {
		const response = await got
			.post(`${PRODUCTS_SERVICE_URI}/productsCategories`, {
				json: { name, iconName },
			})
			.json();
		return response;
	}

	static async fetchProduct({ productId }) {
		const response = await got.get(`${PRODUCTS_SERVICE_URI}/product/${productId}`).json();
		return response;
	}

	static async fetchProductCategory({ categoryId }) {
		const response = await got
			.get(`${PRODUCTS_SERVICE_URI}/productsCategories/${categoryId}`)
			.json();
		return response;
	}

	static async fetchProductsInCategory({ categoryId, pageNumber, pageSize }) {
		const response = await got
			.get(`${PRODUCTS_SERVICE_URI}/productsInCategory/${categoryId}/${pageNumber}/${pageSize}`)
			.json();
		return response;
	}

	static async fetchAllProducts({ pageNumber, pageSize }) {
		const response = await got
			.get(`${PRODUCTS_SERVICE_URI}/products/${pageNumber}/${pageSize}`)
			.json();
		return response;
	}

	static async fetchAllProductsCategories() {
		const response = await got.get(`${PRODUCTS_SERVICE_URI}/productsCategories`).json();
		return response;
	}

	static async countProducts() {
		const response = await got.get(`${PRODUCTS_SERVICE_URI}/products/count`).json();

		return response;
	}

	static async countProductsInCategory({ categoryId }) {
		const response = await got
			.get(`${PRODUCTS_SERVICE_URI}/productsInCategory/count/${categoryId}`)
			.json();
		return response;
	}

	static async createCart({ userId }) {
		const response = await got
			.post(`${PRODUCTS_SERVICE_URI}/carts`, {
				json: { userId },
			})
			.json();
		return response;
	}

	static async fetchCart({ userId }) {
		const response = await got.get(`${PRODUCTS_SERVICE_URI}/carts/${userId}`).json();
		return response;
	}

	static async fetchCartProducts({ userId }) {
		const response = await got.get(`${PRODUCTS_SERVICE_URI}/cartProducts/${userId}`).json();
		return response;
	}

	static async addProductCart({ userId, productId }) {
		const response = await got
			.post(`${PRODUCTS_SERVICE_URI}/cartsProducts`, {
				json: { userId, productId },
			})
			.json();
		return response;
	}

	static async deleteCartProduct({ cartId, productId }) {
		const response = await got
			.delete(`${PRODUCTS_SERVICE_URI}/cartsProducts/delete`, {
				json: { cartId, productId },
			})
			.json();
		return response;
	}

	static async deleteAllCartProduct({ userId }) {
		const response = await got
			.delete(`${PRODUCTS_SERVICE_URI}/cartsProducts/deleteAll`, {
				json: { userId },
			})
			.json();
		return response;
	}

	static async deleteProduct({ id }) {
		const response = await got
			.delete(`${PRODUCTS_SERVICE_URI}/products/delete`, {
				json: { id },
			})
			.json();
		return response;
	}

	static async deleteCategory({ categoryId, newCategoryId }) {
		const response = await got
			.delete(`${PRODUCTS_SERVICE_URI}/productsInCategory/delete`, {
				json: { categoryId, newCategoryId },
			})
			.json();
		return response;
	}
}
