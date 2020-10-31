import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

import { Segment, Grid } from 'semantic-ui-react';

import ListProducts from '../components/Product/ListProducts';
import ListCategories from '../components/Product/ListCategories';
import _Pagination from '../components/_App/_Pagination';

const homeQuery = gql`
	query home($pageNumber: Int!, $pageSize: Int!) {
		products(pageNumber: $pageNumber, pageSize: $pageSize) {
			id
			name
			description
			price
			imageUrl
		}
		productsCategories {
			id
			name
			iconName
		}
		countProducts
	}
`;

function Home({ pageNumber, pageSize }) {
	const { data, loading, error } = useQuery(homeQuery, {
		variables: { pageNumber: pageNumber, pageSize: pageSize },
	});

	if (loading) return 'Loading...';
	if (error) return `Error!: ${error}`;

	const totalPages = Math.ceil(data.countProducts / pageSize);

	return (
		<>
			<Segment>
				<Grid container columns={2}>
					<Grid.Column width={12}>
						<ListProducts itemsPerRow='3' products={data.products} />
						<_Pagination totalPages={totalPages} pageNumber={pageNumber} />
					</Grid.Column>
					<Grid.Column width={3}>
						<ListCategories categories={data.productsCategories} />
					</Grid.Column>
				</Grid>
			</Segment>
		</>
	);
}

Home.getInitialProps = async (ctx) => {
	let pageNumber = ctx.query.page ? ctx.query.page : '1';

	let pageSize = 6;

	pageNumber = parseInt(pageNumber);
	pageSize = parseInt(pageSize);

	return { pageNumber, pageSize };
};

export default Home;
