import jwt from 'jsonwebtoken';
import nextCookie from 'next-cookies';
import Router from 'next/router';

import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import { useMutation } from '@apollo/react-hooks';

import UserHeader from '../components/User/UserHeader';
import ListOrders from '../components/Orders/ListOrders';
import EditForm from '../components/User/EditForm';
import _Pagination from '../components/_App/_Pagination';

const finishedUserOrdersQuery = gql`
	query finishedUserOrders($userId: UUID!, $pageNumber: Int!, $pageSize: Int!) {
		finishedUserOrders(userId: $userId, pageNumber: $pageNumber, pageSize: $pageSize) {
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
		countFinishedUserOrders(userId: $userId)
	}
`;

const userQuery = gql`
	query user($userId: UUID!) {
		user(userId: $userId) {
			name
			surname
			email
			phoneNumber
			street
			postCode
			city
		}
	}
`;

const updateUserMutation = gql`
	mutation updateUser(
		$id: UUID!
		$name: String!
		$surname: String!
		$street: String!
		$postCode: String!
		$city: String!
		$phoneNumber: Int!
	) {
		updateUser(
			id: $id
			name: $name
			surname: $surname
			street: $street
			postCode: $postCode
			city: $city
			phoneNumber: $phoneNumber
		)
	}
`;

let INITIAL_USER = {
	name: '',
	surname: '',
	phoneNumber: '',
	street: '',
	postCode: '',
	city: '',
};

function myAccount({ userId, pageNumber, pageSize }) {
	const [updateUser] = useMutation(updateUserMutation);

	const [user, setUser] = React.useState(INITIAL_USER);
	const [disabled, setDisabled] = React.useState(true);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState('');

	React.useEffect(() => {
		const isUser = Object.values(user).every((el) => Boolean(el));
		isUser ? setDisabled(false) : setDisabled(true);
	}, [user]);

	const { data: userData, loading: userLoading, error: userError } = useQuery(userQuery, {
		variables: { userId: userId },
	});

	const { data: finished_data, loading: finished_loading, error: finished_error } = useQuery(
		finishedUserOrdersQuery,
		{
			variables: { userId: userId, pageNumber: pageNumber, pageSize: pageSize },
		}
	);

	if (userLoading) return 'Loading...';
	if (userError) return `Error!: ${userError}`;

	if (finished_loading) return 'Loading...';
	if (finished_error) return `Error!: ${finished_error}`;

	INITIAL_USER.name = userData.user.name;
	INITIAL_USER.surname = userData.user.surname;
	INITIAL_USER.phoneNumber = userData.user.phoneNumber;
	INITIAL_USER.street = userData.user.street;
	INITIAL_USER.postCode = userData.user.postCode;
	INITIAL_USER.city = userData.user.city;

	function handleChange(event) {
		const { name, value } = event.target;
		setUser((prevState) => ({ ...prevState, [name]: value }));
	}

	async function handleSubmit(event) {
		event.preventDefault();

		try {
			setLoading(true);
			setError('');

			const id = userId;
			const name = user.name;
			const surname = user.surname;
			const phoneNumber = parseInt(user.phoneNumber, 10);
			const street = user.street;
			const postCode = user.postCode;
			const city = user.city;

			await updateUser({
				variables: {
					id,
					name,
					surname,
					phoneNumber,
					street,
					postCode,
					city,
				},
			});
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	}

	const totalPages = Math.ceil(finished_data.countFinishedUserOrders / pageSize);

	return (
		<>
			<UserHeader user={userData.user} />
			<EditForm
				error={error}
				loading={loading}
				disabled={disabled}
				handleSubmit={handleSubmit}
				user={user}
				handleChange={handleChange}
				name={userData.user.name}
				surname={userData.user.surname}
				phoneNumber={userData.user.phoneNumber}
				street={userData.user.street}
				postCode={userData.user.postCode}
				city={userData.user.city}
			/>
			<ListOrders title='Finished Orders' orders={finished_data.finishedUserOrders} />
			<_Pagination totalPages={totalPages} />
		</>
	);
}

myAccount.getInitialProps = async (ctx) => {
	const { token } = nextCookie(ctx);

	if (token) {
		const { userId } = jwt.verify(token, process.env.JWT);

		let pageNumber = ctx.query.page ? ctx.query.page : '1';

		let pageSize = 5;

		pageNumber = parseInt(pageNumber);
		pageSize = parseInt(pageSize);

		return { pageNumber, pageSize, userId };
	} else {
		typeof window !== 'undefined'
			? Router.push('/login')
			: ctx.res.writeHead(302, { Location: '/login' }).end();
	}
};

export default myAccount;
