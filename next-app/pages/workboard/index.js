import nextCookie from 'next-cookies';
import jwt from 'jsonwebtoken';
import Router from 'next/router';
import { isPermittedToWorkboard } from '../../utils/auth';

import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

import IndexMenu from '../../components/Workboard/IndexMenu';
import _Pagination from '../../components/_App/_Pagination';

const userRoleQuery = gql`
	query user($userId: UUID!) {
		user(userId: $userId) {
			role
		}
	}
`;

function index({ userId }) {
	const { data: userData, loading: userLoading, error: userError } = useQuery(userRoleQuery, {
		variables: { userId: userId },
	});

	if (userLoading) return 'Loading...';
	if (userError) return `Error!: ${userError}`;

	// auth
	isPermittedToWorkboard(userData.user.role);

	return <IndexMenu role={userData.user.role} />;
}

index.getInitialProps = async (ctx) => {
	const { token } = nextCookie(ctx);

	if (!token) {
		typeof window !== 'undefined'
			? Router.push('/login')
			: ctx.res.writeHead(302, { Location: '/login' }).end();
	}

	const { userId } = jwt.verify(token, process.env.JWT);

	return { userId };
};

export default index;
