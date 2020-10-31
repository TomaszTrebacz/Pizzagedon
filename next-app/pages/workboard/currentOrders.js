import nextCookie from 'next-cookies';
import jwt from 'jsonwebtoken';
import Router from 'next/router';
import { isAdminOrRoot } from '../../utils/auth';

import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

import IconTitle from '../../components/_App/IconTitle';
import ListOrders from '../../components/Orders/ListOrders';
import _Pagination from '../../components/_App/_Pagination';

const userRoleQuery = gql`
	query user($userId: UUID!) {
		user(userId: $userId) {
			role
		}
	}
`;

const currentOrdersQuery = gql`
	query currentOrders($pageNumber: Int!, $pageSize: Int!) {
		currentOrders(pageNumber: $pageNumber, pageSize: $pageSize) {
			id
			userId
			content
			total
			Accepted
			Cooked
			Delivered
			phoneNumber
			street
			postCode
			city
		}
		countCurrentOrders
	}
`;

function currentOrders({ pageNumber, pageSize, userId }) {
	const { data, loading, error } = useQuery(currentOrdersQuery, {
		variables: { pageNumber: pageNumber, pageSize: pageSize },
	});

	const { data: userData, loading: userLoading, error: userError } = useQuery(userRoleQuery, {
		variables: { userId: userId },
	});

	if (loading) return 'Loading...';
	if (error) return `Error!: ${error}`;

	if (userLoading) return 'Loading...';
	if (userError) return `Error!: ${userError}`;

	// auth
	isAdminOrRoot(userData.user.role);

	const totalPages = Math.ceil(data.countCurrentOrders / pageSize);

	return (
		<>
			<IconTitle title='Current Orders' iconName='folder outline' />
			<ListOrders orders={data.currentOrders} />
			<_Pagination totalPages={totalPages} />
		</>
	);
}

currentOrders.getInitialProps = async (ctx) => {
	const { token } = nextCookie(ctx);

	if (token) {
		const { userId } = jwt.verify(token, process.env.JWT);

		let pageNumber = ctx.query.page ? ctx.query.page : '1';

		let pageSize = 12;

		pageNumber = parseInt(pageNumber);
		pageSize = parseInt(pageSize);

		return { pageNumber, pageSize, userId };
	} else {
		typeof window !== 'undefined'
			? Router.push('/login')
			: ctx.res.writeHead(302, { Location: '/login' }).end();
	}
};

export default currentOrders;
