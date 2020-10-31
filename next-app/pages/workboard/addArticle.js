import nextCookie from 'next-cookies';
import jwt from 'jsonwebtoken';
import Router from 'next/router';
import { isWriter } from '../../utils/auth';

import { useQuery } from 'react-apollo';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import IconTitle from '../../components/_App/IconTitle';
import ArticleForm from '../../components/Blog/ArticleForm';

const userRoleQuery = gql`
	query user($userId: UUID!) {
		user(userId: $userId) {
			role
		}
	}
`;

const addArticleMutation = gql`
	mutation createArticle($title: String!, $content: String!) {
		createArticle(title: $title, content: $content) {
			id
		}
	}
`;

let INITIAL_ARTICLE = {
	title: '',
	content: '',
};

function addArticle({ userId }) {
	const [addArticle] = useMutation(addArticleMutation);

	const { data: userData, loading: userLoading, error: userError } = useQuery(userRoleQuery, {
		variables: { userId: userId },
	});

	const [article, setArticle] = React.useState(INITIAL_ARTICLE);
	const [disabled, setDisabled] = React.useState(true);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState('');

	React.useEffect(() => {
		const isArticle = Object.values(article).every((el) => Boolean(el));
		isArticle ? setDisabled(false) : setDisabled(true);
	}, [article]);

	if (userLoading) return 'Loading...';
	if (userError) return `Error!: ${userError}`;

	// auth
	isWriter(userData.user.role);

	function handleChange(event) {
		const { name, value } = event.target;
		setArticle((prevState) => ({ ...prevState, [name]: value }));
	}

	async function handleSubmit(event) {
		event.preventDefault();

		try {
			setLoading(true);
			setError('');
			const title = article.title;
			const content = article.content;

			const data = await addArticle({
				variables: {
					title,
					content,
				},
			});

			Router.push(`/articles/${data.data.createArticle.id}`);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<>
			<IconTitle title='Add Article' iconName='pencil square' />
			<ArticleForm
				error={error}
				loading={loading}
				disabled={disabled}
				handleSubmit={handleSubmit}
				article={article}
				handleChange={handleChange}
				title='Title'
				content='Content'
			/>
		</>
	);
}

addArticle.getInitialProps = async (ctx) => {
	const { token } = nextCookie(ctx);

	if (!token) {
		typeof window !== 'undefined'
			? Router.push('/login')
			: ctx.res.writeHead(302, { Location: '/login' }).end();
	}

	const { userId } = jwt.verify(token, process.env.JWT);

	return { userId };
};

export default addArticle;
