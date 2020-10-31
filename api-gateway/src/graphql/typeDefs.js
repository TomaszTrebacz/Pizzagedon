import { gql } from 'apollo-server';

const typeDefs = gql`
	scalar Date
	scalar UUID
	scalar Boolean

	type Article {
		id: ID!
		title: String!
		content: String!
		createdAt: Date!
	}

	type Product {
		id: ID!
		name: String!
		description: String!
		price: Int!
		imageUrl: String!
	}

	type Order {
		id: UUID!
		userId: UUID!
		content: String!
		total: Int!
		Accepted: Boolean!
		Cooked: Boolean!
		Delivered: Boolean!
		phoneNumber: Int!
		street: String!
		postCode: String!
		city: String!
	}

	type productCategories {
		id: ID!
		name: String!
		iconName: String!
	}

	type User {
		email: String!
		id: ID!
		name: String!
		surname: String!
		role: String!
		street: String!
		postCode: String!
		city: String!
		phoneNumber: Int!
	}

	type Cart {
		id: UUID!
		userId: UUID!
	}

	type joinCartProduct {
		id: ID!
		cartId: UUID!
		productId: ID!
		quantity: Int!
	}

	type CartProduct {
		categoryId: ID!
		cartId: UUID!
		name: String!
		description: String!
		price: Int!
		imageUrl: String!
		productId: ID!
		quantity: Int!
	}

	type Mutation {
		updateArticle(id: ID!, title: String!, content: String!): Boolean
		createArticle(title: String!, content: String!): Article
		deleteArticle(id: ID!): Boolean

		createProduct(
			categoryId: Int!
			name: String!
			description: String!
			price: Int!
			imageUrl: String!
		): Product!
		deleteProduct(id: ID!): Boolean

		createProductCategory(name: String!, iconName: String!): productCategories!
		deleteProductCategory(categoryId: ID!, newCategoryId: ID!): Boolean

		createCart(userId: UUID!): Cart!
		addProductCart(userId: UUID!, productId: ID!): joinCartProduct!
		deleteCartProduct(cartId: UUID!, productId: ID!): Boolean
		deleteAllCartProduct(userId: UUID!): Boolean

		createOrder(
			userId: UUID!
			content: String!
			total: Int!
			phoneNumber: Int!
			street: String!
			postCode: String!
			city: String!
		): Order!
		setAccepted(id: UUID!): Boolean!
		setCooked(id: UUID!): Boolean!
		setDelivered(id: UUID!): Boolean!

		createUser(
			email: String!
			password: String!
			name: String!
			surname: String!
			street: String!
			postCode: String!
			city: String!
			phoneNumber: Int!
		): User!
		loginUser(email: String!, password: String!): User!
		updateUser(
			id: UUID!
			name: String!
			surname: String!
			street: String!
			postCode: String!
			city: String!
			phoneNumber: Int!
		): Boolean!
		updateUserRole(id: UUID!, role: String!): Boolean!
	}

	type Query {
		article(id: ID!): Article!
		articles(pageNumber: Int!, pageSize: Int!): [Article!]!

		product(productId: ID!): Product
		products(pageNumber: Int!, pageSize: Int!): [Product!]!

		productCategory(categoryId: ID!): productCategories
		productsCategories: [productCategories!]!
		productsInCategory(categoryId: ID!, pageNumber: Int!, pageSize: Int!): [Product]

		cart(userId: UUID!): Cart
		cartProducts(userId: UUID!): [CartProduct]!

		order(id: UUID!): Order!
		orders: [Order!]!
		currentOrders(pageNumber: Int!, pageSize: Int!): [Order!]!
		finishedOrders(pageNumber: Int!, pageSize: Int!): [Order!]!
		currentUserOrders(userId: UUID!, pageNumber: Int!, pageSize: Int!): [Order!]!
		finishedUserOrders(userId: UUID!, pageNumber: Int!, pageSize: Int!): [Order!]!
		toAcceptOrders(pageNumber: Int!, pageSize: Int!): [Order!]!
		toCookOrders(pageNumber: Int!, pageSize: Int!): [Order!]!
		toDeliverOrders(pageNumber: Int!, pageSize: Int!): [Order!]!

		user(userId: UUID!): User!
		rootUser: User!
		allUsers(pageNumber: Int!, pageSize: Int!): [User!]!

		countArticles: Int
		countProducts: Int
		countProductsInCategory(categoryId: ID!): Int
		countToAccept: Int
		countToCook: Int
		countToDeliver: Int
		countCurrentOrders: Int
		countFinishedOrders: Int
		countCurrentUserOrders(userId: UUID!): Int
		countFinishedUserOrders(userId: UUID!): Int
		countAllUsers: Int
	}
`;

export default typeDefs;
