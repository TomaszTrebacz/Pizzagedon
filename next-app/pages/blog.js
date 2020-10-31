import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

import IconTitle from '../components/_App/IconTitle';
import ListArticles from '../components/Blog/ListArticles';
import _Pagination from '../components/_App/_Pagination';

const articlesQuery = gql`
	query articles($pageNumber: Int!, $pageSize: Int!) {
		articles(pageNumber: $pageNumber, pageSize: $pageSize) {
			id
			title
			content
			createdAt
		}
		countArticles
	}
`;

function Blog({ pageNumber, pageSize }) {
	const { data, loading, error } = useQuery(articlesQuery, {
		variables: { pageNumber: pageNumber, pageSize: pageSize },
	});

	if (loading) return 'Loading...';
	if (error) return `Error!: ${error}`;

	const totalPages = Math.ceil(data.countProducts / pageSize);

	return (
		<React.Fragment>
			<IconTitle title='Blog' iconName='send' />
			<ListArticles articles={data.articles} />
			<_Pagination totalPages={totalPages} pageNumber={pageNumber} />
		</React.Fragment>
	);
}

Blog.getInitialProps = async (ctx) => {
	let pageNumber = ctx.query.page ? ctx.query.page : '1';

	let pageSize = 6;

	pageNumber = parseInt(pageNumber);
	pageSize = parseInt(pageSize);

	return { pageNumber, pageSize };
};

export default Blog;
