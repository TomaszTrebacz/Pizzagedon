import nextCookie from 'next-cookies';
import jwt from 'jsonwebtoken';
import Router from 'next/router';
import { isAdminOrRoot } from '../../utils/auth';

import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

import ListOrders from '../../components/Orders/ListOrders';
import IconTitle from '../../components/_App/IconTitle';
import _Pagination from '../../components/_App/_Pagination';

const userRoleQuery = gql`
	query user($userId: UUID!) {
		user(userId: $userId) {
			role
		}
	}
`;

const finishedOrdersQuery = gql`
	query finishedOrders($pageNumber: Int!, $pageSize: Int!) {
		finishedOrders(pageNumber: $pageNumber, pageSize: $pageSize) {
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
		countFinishedOrders
	}
`;

function finishedOrders({ pageNumber, pageSize, userId }) {
	const { data, loading, error } = useQuery(finishedOrdersQuery, {
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
	console.log(data.countFinishedOrders);
	const totalPages = Math.ceil(data.countFinishedOrders / pageSize);

	return (
		<>
			<IconTitle title='Finished Orders' iconName='folder outline' />
			<ListOrders title='Finished Orders' orders={data.finishedOrders} />
			<_Pagination totalPages={totalPages} />
		</>
	);
}

finishedOrders.getInitialProps = async (ctx) => {
	const { token } = nextCookie(ctx);

	if (token) {
		const { userId } = jwt.verify(token, process.env.JWT);

		let pageNumber = ctx.query.page ? ctx.query.page : '1';

		let pageSize = 3;

		pageNumber = parseInt(pageNumber);
		pageSize = parseInt(pageSize);

		return { pageNumber, pageSize, userId };
	} else {
		typeof window !== 'undefined'
			? Router.push('/login')
			: ctx.res.writeHead(302, { Location: '/login' }).end();
	}
};

export default finishedOrders;
