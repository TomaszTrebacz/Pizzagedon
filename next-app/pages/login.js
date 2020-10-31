import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import jwt from 'jsonwebtoken';
import { login } from '../utils/auth';
import LoginForm from '../components/User/LoginForm';

const loginMutation = gql`
	mutation($email: String!, $password: String!) {
		loginUser(email: $email, password: $password) {
			id
		}
	}
`;

const INITIAL_USER = {
	email: '',
	password: '',
};

function Login() {
	const [loginUser] = useMutation(loginMutation);

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

			const email = user.email;
			const password = user.password;

			const {
				data: { loginUser: loggedUser },
			} = await loginUser({ variables: { email, password } });

			const userId = loggedUser.id;
			const token = jwt.sign({ userId: userId }, process.env.JWT, {
				expiresIn: '7d',
			});
			await login({ token });
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<LoginForm
			error={error}
			loading={loading}
			handleSubmit={handleSubmit}
			handleChange={handleChange}
			disabled={disabled}
			user={user}
		/>
	);
}

export default Login;
