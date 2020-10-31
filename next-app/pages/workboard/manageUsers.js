import nextCookie from 'next-cookies';
import jwt from 'jsonwebtoken';
import Router from 'next/router';
import { isAdminOrRoot } from '../../utils/auth';

import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import { useMutation } from '@apollo/react-hooks';

import IconTitle from '../../components/_App/IconTitle';
import UsersTable from '../../components/Workboard/UsersTable';
import _Pagination from '../../components/_App/_Pagination';

const allUsersQuery = gql`
	query allUsers($userId: UUID!, $pageNumber: Int!, $pageSize: Int!) {
		allUsers(pageNumber: $pageNumber, pageSize: $pageSize) {
			id
			email
			name
			surname
			role
			street
			postCode
			city
		}
		user(userId: $userId) {
			role
		}
		countAllUsers
	}
`;

const updateUserRoleMutation = gql`
	mutation updateUserRole($id: UUID!, $value: String!) {
		updateUserRole(id: $id, role: $value)
	}
`;

function manageUsers({ pageNumber, pageSize, userId }) {
	const [loadingMutation, setLoadingMutation] = React.useState(false);
	const [successMutation, setSuccessMutation] = React.useState(false);

	const [updateUserRole] = useMutation(updateUserRoleMutation);
	const { data, loading, error } = useQuery(allUsersQuery, {
		variables: { userId: userId, pageNumber: pageNumber, pageSize: pageSize },
	});

	if (loading) return 'Loading...';
	if (error) return `Error!: ${error}`;

	// auth
	isAdminOrRoot(data.user.role);

	const rolesType = [
		{ key: 'Admin', text: 'Admin', value: 'Admin' },
		{ key: 'Worker', text: 'Worker', value: 'Worker' },
		{ key: 'Deliverer', text: 'Deliverer', value: 'Deliverer' },
		{ key: 'Writer', text: 'Writer', value: 'Writer' },
		{ key: 'User', text: 'User', value: 'User' },
	];

	async function handleDropdown(event, { id, value }) {
		event.preventDefault();
		try {
			setLoadingMutation(true);
			await updateUserRole({ variables: { id, value } });
			setSuccessMutation(true);
		} catch (error) {
			alert(error);
		} finally {
			setLoadingMutation(false);
		}
	}

	const totalPages = Math.ceil(data.countAllUsers / pageSize);

	return (
		<>
			<IconTitle title='Manage users' iconName='users' />
			<UsersTable
				allUsers={data.allUsers}
				handleDropdown={handleDropdown}
				rolesType={rolesType}
				loadingMutation={loadingMutation}
				successMutation={successMutation}
			/>
			<_Pagination totalPages={totalPages} />
		</>
	);
}

manageUsers.getInitialProps = async (ctx) => {
	const { token } = nextCookie(ctx);

	if (token) {
		const { userId } = jwt.verify(token, process.env.JWT);

		let pageNumber = ctx.query.page ? ctx.query.page : '1';

		let pageSize = 20;

		pageNumber = parseInt(pageNumber);
		pageSize = parseInt(pageSize);

		return { pageNumber, pageSize, userId };
	} else {
		typeof window !== 'undefined'
			? Router.push('/login')
			: ctx.res.writeHead(302, { Location: '/login' }).end();
	}
};

export default manageUsers;
