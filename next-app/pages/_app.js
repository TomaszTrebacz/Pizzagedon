import React from 'react';

import withApollo from 'next-with-apollo';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient, { InMemoryCache } from 'apollo-boost';

import { DefaultSeo } from 'next-seo';
import NextSEO from '../utils/next-seo.config';

import Head from 'next/head';
import Layout from '../components/_App/Layout';

const App = ({ Component, pageProps, apollo }) => (
	<ApolloProvider client={apollo}>
		<Layout>
			<DefaultSeo {...NextSEO} />
			<Head>
				<title>Pizzagedon!</title>
			</Head>
			<Component {...pageProps} />
		</Layout>
	</ApolloProvider>
);

export default withApollo(({ initialState }) => {
	return new ApolloClient({
		uri: 'http://localhost:7000/graphql',
		cache: new InMemoryCache().restore(initialState || {}),
	});
})(App);
