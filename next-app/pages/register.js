import jwt from 'jsonwebtoken';
import cookie from 'js-cookie';
import Router from 'next/router';

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import RegisterForm from '../components/User/RegisterForm';
import { sendGridEmail, registerTitle, registerMessage } from '../utils/messages';

const mutation = gql`
	mutation(
		$email: String!
		$password: String!
		$name: String!
		$surname: String!
		$street: String!
		$postCode: String!
		$city: String!
		$phoneNumber: Int!
	) {
		createUser(
			email: $email
			password: $password
			name: $name
			surname: $surname
			street: $street
			postCode: $postCode
			city: $city
			phoneNumber: $phoneNumber
		) {
			id
		}
	}
`;

const mutationCart = gql`
	mutation($userId: UUID!) {
		createCart(userId: $userId) {
			id
		}
	}
`;

const INITIAL_USER = {
	name: '',
	surname: '',
	email: '',
	password: '',
	phoneNumber: '',
	street: '',
	postCode: '',
	city: '',
};

function Register() {
	const [createUser] = useMutation(mutation);
	const [createCart] = useMutation(mutationCart);

	const [user, setUser] = React.useState(INITIAL_USER);
	const [disabled, setDisabled] = React.useState(true);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState('');

	React.useEffect(() => {
		const isUser = Object.values(user).every((el) => Boolean(el));
		isUser ? setDisabled(false) : setDisabled(true);
	}, [user]);

	function handleChange(event) {
		const { name, value } = event.target;
		setUser((prevState) => ({ ...prevState, [name]: value }));
	}

	async function handleSubmit(event) {
		event.preventDefault();

		try {
			setLoading(true);
			setError('');

			const name = user.name;
			const surname = user.surname;
			const email = user.email;
			const password = user.password;
			const phoneNumber = parseInt(user.phoneNumber, 10);
			const street = user.street;
			const postCode = user.postCode;
			const city = user.city;

			const { data } = await createUser({
				variables: {
					name,
					surname,
					email,
					password,
					phoneNumber,
					street,
					postCode,
					city,
				},
			});

			const sendData = {
				sendGridEmail: sendGridEmail,
				title: registerTitle,
				message: registerMessage,
				email: email,
			};

			await fetch('../api/sendGrid', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(sendData),
			});

			const userId = data.createUser.id;

			await createCart({ variables: { userId } });

			const token = jwt.sign({ userId: userId }, process.env.JWT, {
				expiresIn: '7d',
			});

			cookie.set('token', token);
			Router.push('/login');
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<RegisterForm
			error={error}
			loading={loading}
			handleSubmit={handleSubmit}
			user={user}
			handleChange={handleChange}
			disabled={disabled}
		/>
	);
}

export default Register;
