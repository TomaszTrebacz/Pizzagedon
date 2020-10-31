import nextCookie from 'next-cookies';
import jwt from 'jsonwebtoken';
import Router, { useRouter } from 'next/router';

import { useQuery } from 'react-apollo';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import ArticlePage from '../../components/Blog/ArticlePage';
import ArticleForm from '../../components/Blog/ArticleForm';
import ArticleSettings from '../../components/Blog/ArticleSettings';

const userQuery = gql`
	query user($userId: UUID!) {
		user(userId: $userId) {
			role
		}
	}
`;

const articleQuery = gql`
	query($id: ID!) {
		article(id: $id) {
			id
			title
			content
		}
	}
`;

const deleteArticleMutation = gql`
	mutation deleteArticle($id: ID!) {
		deleteArticle(id: $id)
	}
`;

const updateArticleMutation = gql`
	mutation updateArticle($id: ID!, $title: String!, $content: String!) {
		updateArticle(id: $id, title: $title, content: $content)
	}
`;

let INITIAL_ARTICLE = {
	title: '',
	content: '',
};

const id = ({ userId }) => {
	const router = useRouter();
	const { id } = router.query;

	const [updateArticle] = useMutation(updateArticleMutation);
	const [deleteArticle] = useMutation(deleteArticleMutation);

	const [article, setArticle] = React.useState(INITIAL_ARTICLE);
	const [disabled, setDisabled] = React.useState(true);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState('');

	React.useEffect(() => {
		const isArticle = Object.values(article).every((el) => Boolean(el));
		isArticle ? setDisabled(false) : setDisabled(true);
	}, [article]);

	const { data: userData, loading: userLoading, error: userError } = useQuery(userQuery, {
		variables: { userId: userId },
	});

	const { data: articleData, loading: articleLoading, error: articleError } = useQuery(
		articleQuery,
		{
			variables: { id: id },
		}
	);

	if (articleLoading) return 'Loading...';
	if (articleError) return `Error!: ${error}`;

	if (userLoading) return 'Loading...';
	if (userError) return `Error!: ${userError}`;

	let Permissions;
	if (
		(userData.user.role = 'admin') ||
		(userData.user.role = 'root') ||
		(userData.user.role = 'writer')
	) {
		Permissions = true;
	} else {
		Permissions = false;
	}

	INITIAL_ARTICLE.title = articleData.article.title;
	INITIAL_ARTICLE.content = articleData.article.content;

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

			await updateArticle({
				variables: {
					id,
					title,
					content,
				},
			});

			INITIAL_ARTICLE.title = title;
			INITIAL_ARTICLE.content = content;

			articleData.article.title = title;
			articleData.article.content = content;
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	}

	async function deleteArticleButton(event, { id }) {
		event.preventDefault();
		await deleteArticle({ variables: { id } });
		router.push('/blog');
	}

	return (
		<>
			<ArticlePage article={articleData.article} />
			{Permissions && (
				<>
					<ArticleForm
						error={error}
						loading={loading}
						disabled={disabled}
						handleSubmit={handleSubmit}
						article={article}
						handleChange={handleChange}
						title={articleData.article.title}
						content={articleData.article.content}
					/>
					<ArticleSettings article={article} deleteArticleButton={deleteArticleButton} />
				</>
			)}
		</>
	);
};

id.getInitialProps = async (ctx) => {
	const { token } = nextCookie(ctx);

	if (token) {
		const { userId } = jwt.verify(token, process.env.JWT);

		return { userId };
	} else {
		typeof window !== 'undefined'
			? Router.push('/login')
			: ctx.res.writeHead(302, { Location: '/login' }).end();
	}
};

export default id;
