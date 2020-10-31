import nextCookie from 'next-cookies';
import jwt from 'jsonwebtoken';
import Router from 'next/router';

import { useQuery } from 'react-apollo';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import axios from 'axios';

import ProductForm from '../../components/Workboard/ProductForm';
import { isAdminOrRoot } from '../../utils/auth';

const userRoleQuery = gql`
	query user($userId: UUID!) {
		user(userId: $userId) {
			role
		}
	}
`;

const categoriesQuery = gql`
	query productCategories {
		productsCategories {
			id
			name
			iconName
		}
	}
`;

const createProductMutation = gql`
	mutation(
		$categoryId: Int!
		$name: String!
		$description: String!
		$price: Int!
		$imageUrl: String!
	) {
		createProduct(
			categoryId: $categoryId
			name: $name
			description: $description
			price: $price
			imageUrl: $imageUrl
		) {
			id
		}
	}
`;

const INITIAL_PRODUCT = {
	name: '',
	description: '',
	price: '',
	image: '',
};

function addProduct({ userId }) {
	const { data: queryData, loading: queryLoading, error: queryError } = useQuery(categoriesQuery);
	const { data: userData, loading: userLoading, error: userError } = useQuery(userRoleQuery, {
		variables: { userId: userId },
	});

	const [createProduct] = useMutation(createProductMutation);

	const [imagePreview, setImagePreview] = React.useState('');
	const [product, setProduct] = React.useState(INITIAL_PRODUCT);
	const [disabled, setDisabled] = React.useState(true);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState('');
	const [success, setSuccess] = React.useState(false);
	const [dropdown, setDropdown] = React.useState(true);

	React.useEffect(() => {
		const isProduct = Object.values(product).every((el) => Boolean(el));
		isProduct && dropdown ? setDisabled(false) : setDisabled(true);
	}, [product]);

	if (queryLoading) return 'Loading...';
	if (queryError) return `Error!: ${error}`;

	if (userLoading) return 'Loading...';
	if (userError) return `Error!: ${userError}`;

	// auth
	isAdminOrRoot(userData.user.role);

	const categoriesType = queryData.productsCategories.map((category) => ({
		key: category.name,
		text: category.name,
		value: category.id,
	}));

	function handleChange(event) {
		const { name, value, files } = event.target;
		if (name === 'image') {
			setProduct((prevState) => ({ ...prevState, image: files[0] }));
			setImagePreview(window.URL.createObjectURL(files[0]));
		} else {
			setProduct((prevState) => ({ ...prevState, [name]: value }));
		}
	}

	async function handleDropdown(event, { value }) {
		event.preventDefault();
		setDropdown(value);
	}

	async function uploadImage() {
		const data = new FormData();
		data.append('file', product.image);
		data.append('upload_preset', 'product_photo');
		data.append('cloud_name', 'dase8vcog');
		const response = await axios.post(process.env.CLOUDINARY_URL, data);
		const imageUrl = response.data.url;
		return imageUrl;
	}

	async function handleSubmit(event) {
		event.preventDefault();
		setProduct(INITIAL_PRODUCT);
		try {
			setLoading(true);
			setError('');
			if (!dropdown) {
				setError('Select category.');
				setLoading(false);
			}
			const imageUrl = await uploadImage();

			const name = product.name;
			const description = product.description;
			const categoryId = parseInt(dropdown, 10);
			const price = parseInt(product.price, 10);

			await createProduct({ variables: { categoryId, name, description, price, imageUrl } });
			setSuccess(true);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<>
			<ProductForm
				success={success}
				error={error}
				disabled={disabled}
				loading={loading}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				handleDropdown={handleDropdown}
				categoriesType={categoriesType}
				product={product}
				imagePreview={imagePreview}
			/>
		</>
	);
}

addProduct.getInitialProps = async (ctx) => {
	const { token } = nextCookie(ctx);

	if (!token) {
		typeof window !== 'undefined'
			? Router.push('/login')
			: ctx.res.writeHead(302, { Location: '/login' }).end();
	}

	const { userId } = jwt.verify(token, process.env.JWT);

	return { userId };
};

export default addProduct;
