import { Segment } from 'semantic-ui-react';
import Link from 'next/link';

function Footer() {
	return (
		<Segment color='orange' textAlign='center'>
			<Link href='//flaticon.com/authors/freepik'>
				<a>Icons made by authors </a>
			</Link>
			from
			<Link href='//flaticon.com'>
				<a> FlatIcon. </a>
			</Link>
			App created with Node, Next, Apollo GraphQL, MariaDB and Docker.
		</Segment>
	);
}

export default Footer;
