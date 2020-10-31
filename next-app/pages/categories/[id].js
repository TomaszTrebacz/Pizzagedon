import nextCookie from 'next-cookies';
import jwt from 'jsonwebtoken';
import Router, { useRouter } from 'next/router';

import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import { useMutation } from '@apollo/react-hooks';

import { Segment } from 'semantic-ui-react';
import ListProducts from '../../components/Product/ListProducts';
import _Pagination from '../../components/_App/_Pagination';
import ImageTitle from '../../components/_App/ImageTitle';
import DeleteCategory from '../../components/Workboard/DeleteCategory';

const userRoleQuery = gql`
	query user($userId: UUID!) {
		user(userId: $userId) {
			role
		}
	}
`;

const categoryQuery = gql`
	query productsInCategory($categoryId: ID!, $pageNumber: Int!, $pageSize: Int!) {
		productsInCategory(categoryId: $categoryId, pageNumber: $pageNumber, pageSize: $pageSize) {
			id
			name
			description
			price
			imageUrl
		}
		productCategory(categoryId: $categoryId) {
			id
			name
			iconName
		}
		productsCategories {
			id
			name
			iconName
		}
		countProductsInCategory(categoryId: $categoryId)
	}
`;

const deleteCategoryMutation = gql`
	mutation deleteCategory($categoryId: ID!, $newCategoryId: ID!) {
		deleteCategory(categoryId: $categoryId, newCategoryId: $newCategoryId)
	}
`;

const Category = ({ pageNumber, pageSize, userId }) => {
	const router = useRouter();
	const { id } = router.query;

	const [loadingMutation, setLoadingMutation] = React.useState(false);

	const [deleteCategory] = useMutation(deleteCategoryMutation);

	const { data: userData, loading: userLoading, error: userError } = useQuery(userRoleQuery, {
		variables: { userId: userId },
	});

	const { data, loading, error } = useQuery(categoryQuery, {
		variables: { categoryId: id, pageNumber: pageNumber, pageSize: pageSize },
	});

	if (userLoading) return 'Loading...';
	if (userError) return `Error!: ${userError}`;

	if (loading) return 'Loading...';
	if (error) return `Error!: ${error}`;

	const categoriesType = data.productsCategories.map((category) => ({
		key: category.name,
		text: category.name,
		value: category.id,
	}));

	async function handleDropdown(event, { categoryId, value }) {
		event.preventDefault();
		try {
			setLoadingMutation(true);

			const newCategoryId = value;

			await deleteCategory({ variables: { categoryId, newCategoryId } });

			Router.push(`categories/${newCategoryId}`);
		} catch (error) {
			alert(error);
		} finally {
			setLoadingMutation(false);
		}
	}

	let isPermitted;
	if ((userData.user.role = 'admin') || (userData.user.role = 'root')) {
		isPermitted = true;
	} else {
		isPermitted = false;
	}

	const totalPages = Math.ceil(data.countProductsInCategory / pageSize);

	return (
		<>
			<ImageTitle title={data.productCategory.name} image={data.productCategory.iconName} />
			<Segment>
				<DeleteCategory
					isPermitted={isPermitted}
					categoryId={data.productCategory.id}
					handleDropdown={handleDropdown}
					categoriesType={categoriesType}
					loadingMutation={loadingMutation}
				/>
				<ListProducts itemsPerRow='4' products={data.productsInCategory} />
				<_Pagination totalPages={totalPages} pageNumber={pageNumber} />
			</Segment>
		</>
	);
};

Category.getInitialProps = async (ctx) => {
	const { token } = nextCookie(ctx);

	if (token) {
		const { userId } = jwt.verify(token, process.env.JWT);

		let pageNumber = ctx.query.page ? ctx.query.page : '1';

		let pageSize = 6;

		pageNumber = parseInt(pageNumber);
		pageSize = parseInt(pageSize);

		return { pageNumber, pageSize, userId };
	} else {
		typeof window !== 'undefined'
			? Router.push('/login')
			: ctx.res.writeHead(302, { Location: '/login' }).end();
	}
};

export default Category;
