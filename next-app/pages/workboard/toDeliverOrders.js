import nextCookie from 'next-cookies';
import jwt from 'jsonwebtoken';
import Router from 'next/router';
import { isDeliverer } from '../../utils/auth';

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

const toDeliverOrdersQuery = gql`
	query toDeliverOrders($pageNumber: Int!, $pageSize: Int!) {
		toDeliverOrders(pageNumber: $pageNumber, pageSize: $pageSize) {
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
		countToDeliver
	}
`;

function toDeliverOrders({ pageNumber, pageSize, userId }) {
	const { data, loading, error } = useQuery(toDeliverOrdersQuery, {
		variables: { pageNumber: pageNumber, pageSize: pageSize },
	});

	const { data: userData, loading: userLoading, error: userError } = useQuery(userRoleQuery, {
		variables: { userId: userId },
	});

	if (userLoading) return 'Loading...';
	if (userError) return `Error!: ${userError}`;

	// auth
	isDeliverer(userData.user.role);

	if (loading) return 'Loading...';
	if (error) return `Error!: ${error}`;

	const totalPages = Math.ceil(data.countToCook / pageSize);

	return (
		<>
			<IconTitle title='Orders to Deliver' iconName='truck' />
			<ListOrders orders={data.toDeliverOrders} />
			<_Pagination totalPages={totalPages} />
		</>
	);
}

toDeliverOrders.getInitialProps = async (ctx) => {
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

export default toDeliverOrders;
