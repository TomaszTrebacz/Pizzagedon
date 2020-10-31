import { Container } from 'semantic-ui-react';

import _Header from './_Header';
import Footer from './Footer';

import React from 'react';

function Layout({ children }) {
	return (
		<>
			<Container maxwidth={767}>
				<_Header />
				{children}
				<Footer />
			</Container>
		</>
	);
}

export default Layout;
