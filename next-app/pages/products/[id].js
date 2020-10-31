import nextCookie from 'next-cookies';
import jwt from 'jsonwebtoken';
import Router, { useRouter } from 'next/router';

import { useQuery } from 'react-apollo';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import ProductPage from '../../components/Product/ProductPage';

const userQuery = gql`
	query user($userId: UUID!) {
		user(userId: $userId) {
			role
		}
	}
`;

const productQuery = gql`
	query($productId: ID!) {
		product(productId: $productId) {
			id
			name
			description
			price
			imageUrl
		}
	}
`;

const addProductCartMutation = gql`
	mutation addProductCart($userId: UUID!, $productId: ID!) {
		addProductCart(userId: $userId, productId: $productId) {
			id
			cartId
			productId
			quantity
		}
	}
`;

const deleteProductMutation = gql`
	mutation deleteProduct($id: ID!) {
		deleteProduct(id: $id)
	}
`;

const id = ({ userId }) => {
	const router = useRouter();
	const { id } = router.query;

	const [addProductCart] = useMutation(addProductCartMutation);
	const [deleteProduct] = useMutation(deleteProductMutation);

	const { data: userData, loading: userLoading, error: userError } = useQuery(userQuery, {
		variables: { userId: userId },
	});

	const { data, loading, error } = useQuery(productQuery, {
		variables: { productId: id },
	});

	if (loading) return 'Loading...';
	if (error) return `Error!: ${error}`;

	if (userLoading) return 'Loading...';
	if (userError) return `Error!: ${userError}`;

	let deletePermissions;
	if ((userData.user.role = 'admin') || (userData.user.role = 'root')) {
		deletePermissions = true;
	} else {
		deletePermissions = false;
	}

	async function addProductCartButton(event, { productId }) {
		event.preventDefault();

		await addProductCart({ variables: { userId, productId } });
		router.push('/cart');
	}

	async function deleteProductButton(event, { id }) {
		event.preventDefault();
		await deleteProduct({ variables: { id } });
		router.push('/');
	}

	return (
		<>
			<ProductPage
				product={data.product}
				deletePermissions={deletePermissions}
				addProductCartButton={addProductCartButton}
				deleteProductButton={deleteProductButton}
			/>
		</>
	);
};

id.getInitialProps = async (ctx) => {
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

export default id;
