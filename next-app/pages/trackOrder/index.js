import nextCookie from 'next-cookies';
import jwt from 'jsonwebtoken';
import Router from 'next/router';

import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

import IconTitle from '../../components/_App/IconTitle';
import ListOrders from '../../components/Orders/ListOrders';
import _Pagination from '../../components/_App/_Pagination';

const currentUserOrdersQuery = gql`
	query currentUserOrders($userId: UUID!, $pageNumber: Int!, $pageSize: Int!) {
		currentUserOrders(userId: $userId, pageNumber: $pageNumber, pageSize: $pageSize) {
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
		countCurrentUserOrders(userId: $userId)
	}
`;

function index({ pageNumber, pageSize, userId }) {
	const { data, loading, error } = useQuery(currentUserOrdersQuery, {
		variables: { userId: userId, pageNumber: pageNumber, pageSize: pageSize },
	});

	if (loading) return 'Loading...';
	if (error) return `Error!: ${error}`;

	const totalPages = Math.ceil(data.countCurrentUserOrders / pageSize);

	return (
		<>
			<IconTitle title='Current Orders' iconName='folder outline' />
			<ListOrders orders={data.currentUserOrders} />
			<_Pagination totalPages={totalPages} />
		</>
	);
}

index.getInitialProps = async (ctx) => {
	const { token } = nextCookie(ctx);

	if (token) {
		const { userId } = jwt.verify(token, process.env.JWT);

		let pageNumber = ctx.query.page ? ctx.query.page : '1';

		let pageSize = 2;

		pageNumber = parseInt(pageNumber);
		pageSize = parseInt(pageSize);

		return { pageNumber, pageSize, userId };
	} else {
		typeof window !== 'undefined'
			? Router.push('/login')
			: ctx.res.writeHead(302, { Location: '/login' }).end();
	}
};

export default index;
