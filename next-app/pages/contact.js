import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';

import ContactInfo from '../components/User/ContactInfo';
import IconTitle from '../components/_App/IconTitle';

const userRootQuery = gql`
	query rootUser {
		rootUser {
			phoneNumber
			street
			postCode
			city
		}
	}
`;

function Contact() {
	const { data, loading, error } = useQuery(userRootQuery);

	if (loading) return 'Loading...';
	if (error) return `Error!: ${error}`;

	return (
		<>
			<IconTitle title='Contact' iconName='address book outline' />
			<ContactInfo data={data.rootUser} />
		</>
	);
}

export default Contact;
