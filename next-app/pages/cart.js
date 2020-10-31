import nextCookie from 'next-cookies';
import jwt from 'jsonwebtoken';
import Router from 'next/router';
import axios from 'axios';

import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import { useMutation } from '@apollo/react-hooks';

import { Message } from 'semantic-ui-react';
import ListCartProducts from '../components/Cart/ListCartProducts';
import Checkout from '../components/Cart/Checkout';

const userQuery = gql`
	query user($userId: UUID!) {
		user(userId: $userId) {
			email
			street
			postCode
			city
			phoneNumber
		}
	}
`;

const cartProductsQuery = gql`
	query($userId: UUID!) {
		cartProducts(userId: $userId) {
			categoryId
			cartId
			name
			description
			price
			imageUrl
			productId
			quantity
		}
	}
`;

const deleteCartProductMutation = gql`
	mutation($cartId: UUID!, $productId: ID!) {
		deleteCartProduct(cartId: $cartId, productId: $productId)
	}
`;

const deleteAllCartProductsMutation = gql`
	mutation($userId: UUID!) {
		deleteAllCartProduct(userId: $userId)
	}
`;

const createOrderMutation = gql`
	mutation(
		$userId: UUID!
		$content: String!
		$total: Int!
		$phoneNumber: Int!
		$street: String!
		$postCode: String!
		$city: String!
	) {
		createOrder(
			userId: $userId
			content: $content
			total: $total
			phoneNumber: $phoneNumber
			street: $street
			postCode: $postCode
			city: $city
		) {
			id
		}
	}
`;

const cart = ({ userId }) => {
	const [deleteProduct] = useMutation(deleteCartProductMutation);
	const [deleteAllProducts] = useMutation(deleteAllCartProductsMutation);
	const [createOrder] = useMutation(createOrderMutation);
	const [success, setSuccess] = React.useState(false);
	const [loadingStripe, setLoadingStripe] = React.useState(false);

	const { data, loading, error } = useQuery(cartProductsQuery, {
		variables: { userId: userId },
	});

	const { data: userData, loading: userLoading, error: userError } = useQuery(userQuery, {
		variables: { userId: userId },
	});

	if (userLoading) return 'Loading...';
	if (userError) return `Error!: ${userError}`;

	if (loading) return 'Loading...';
	if (error) return `Error!: ${error}`;

	// calculate price for db and stripe
	function calculatePrice(data) {
		const total = data.reduce((acc, el) => {
			acc += el.price * el.quantity;
			return acc;
		}, 0);

		const stripeTotal = Number((total * 100).toFixed(2));

		return { total, stripeTotal };
	}

	const { total, stripeTotal } = calculatePrice(data.cartProducts);

	function fetchContentOrder(data) {
		let content = data
			.map((product) => ({ [product.name]: product.quantity }))
			.reduce((obj1, obj2) => Object.assign(obj1, obj2), {});

		content = JSON.stringify(content);
		content = content.replace(/[{}]/g, '');

		return { content };
	}

	async function handleCheckout(paymentData) {
		try {
			setLoadingStripe(true);

			// next api
			const url = `/api/stripe`;
			const payload = { paymentData, stripeTotal };
			await axios.post(url, payload);

			const phoneNumber = userData.user.phoneNumber;
			const street = userData.user.street;
			const postCode = userData.user.postCode;
			const city = userData.user.city;

			// graphql
			const { content } = fetchContentOrder(data.cartProducts);

			await createOrder({
				variables: { userId, content, total, phoneNumber, street, postCode, city },
			});

			await deleteAllProducts({ variables: { userId } });

			setSuccess(true);
		} catch (error) {
			catchErrors(error, window.alert);
		} finally {
			setLoadingStripe(false);
		}
	}

	async function deleteButton(event, { product }) {
		event.preventDefault();
		let cartId = product.cartId;
		let productId = product.productId;
		console.log(cartId);
		console.log(productId);
		await deleteProduct({ variables: { cartId, productId } });
		Router.push('/cart');
	}

	if (success) {
		return (
			<Message
				success
				header='Success!'
				content='Your order and payment has been accepted'
				icon='star outline'
			/>
		);
	}

	return (
		<>
			<ListCartProducts
				loading={loadingStripe}
				products={data.cartProducts}
				deleteButton={deleteButton}
			/>
			<Checkout
				stripeTotal={stripeTotal}
				email={userData.user.email}
				handleCheckout={handleCheckout}
			/>
		</>
	);
};

cart.getInitialProps = async (ctx) => {
	const { token } = nextCookie(ctx);

	if (token) {
		const { userId } = jwt.verify(token, process.env.JWT);

		return { userId };
	} else {
		typeof window !== 'undefined'
			? Router.push('/login')
			: ctx.res.writeHead(302, { Location: '/login' }).end();
	}
};

export default cart;
