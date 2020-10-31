import nextCookie from 'next-cookies';
import jwt from 'jsonwebtoken';
import Router from 'next/router';

import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import { useMutation } from '@apollo/react-hooks';
import axios from 'axios';

import CategoryForm from '../../components/Workboard/CategoryForm';
import { isAdminOrRoot } from '../../utils/auth';

const userRoleQuery = gql`
	query user($userId: UUID!) {
		user(userId: $userId) {
			role
		}
	}
`;

const createCategoryMutation = gql`
	mutation($name: String!, $iconName: String!) {
		createProductCategory(name: $name, iconName: $iconName) {
			id
		}
	}
`;

const INITIAL_PRODUCTCATEGORY = {
	name: '',
	image: '',
};

function addProductCategory({ userId }) {
	const [createProductCategory] = useMutation(createCategoryMutation);

	const { data: userData, loading: userLoading, error: userError } = useQuery(userRoleQuery, {
		variables: { userId: userId },
	});

	const [imagePreview, setImagePreview] = React.useState('');
	const [productCategory, setProductCategory] = React.useState(INITIAL_PRODUCTCATEGORY);
	const [disabled, setDisabled] = React.useState(true);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState('');
	const [success, setSuccess] = React.useState(false);

	React.useEffect(() => {
		const isProductCategory = Object.values(productCategory).every((el) => Boolean(el));
		isProductCategory ? setDisabled(false) : setDisabled(true);
	}, [productCategory]);

	if (userLoading) return 'Loading...';
	if (userError) return `Error!: ${userError}`;

	// auth
	isAdminOrRoot(userData.user.role);

	function handleChange(event) {
		const { name, value, files } = event.target;
		if (name === 'image') {
			setProductCategory((prevState) => ({ ...prevState, image: files[0] }));
			setImagePreview(window.URL.createObjectURL(files[0]));
		} else {
			setProductCategory((prevState) => ({ ...prevState, [name]: value }));
		}
	}

	async function uploadImage() {
		const data = new FormData();
		data.append('file', productCategory.image);
		data.append('upload_preset', 'category_photo');
		data.append('cloud_name', 'dase8vcog');
		const response = await axios.post(process.env.CLOUDINARY_URL, data);
		const iconName = response.data.url;
		return iconName;
	}

	async function handleSubmit(event) {
		event.preventDefault();
		setProductCategory(INITIAL_PRODUCTCATEGORY);

		try {
			setLoading(true);
			setError('');

			const iconName = await uploadImage();

			const name = productCategory.name;

			await createProductCategory({
				variables: {
					name,
					iconName,
				},
			});

			setSuccess(true);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<CategoryForm
			success={success}
			error={error}
			loading={loading}
			disabled={disabled}
			handleSubmit={handleSubmit}
			handleChange={handleChange}
			productCategory={productCategory}
			imagePreview={imagePreview}
		/>
	);
}

addProductCategory.getInitialProps = async (ctx) => {
	const { token } = nextCookie(ctx);

	if (!token) {
		typeof window !== 'undefined'
			? Router.push('/login')
			: ctx.res.writeHead(302, { Location: '/login' }).end();
	}

	const { userId } = jwt.verify(token, process.env.JWT);

	return { userId };
};

export default addProductCategory;
