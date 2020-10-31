import { Segment, Header, Icon } from 'semantic-ui-react';

function ContactInfo({ data }) {
	return (
		<Segment>
			<Header as='h3'>
				<Icon name='home' color='orange' />
				Address:
			</Header>
			<Header.Subheader>
				{data.street} Street, <br />
				{data.postCode}, {data.city}
			</Header.Subheader>

			<Header as='h3'>
				<Icon name='phone square' color='orange' /> Phone Number:
			</Header>
			<Header.Subheader>{data.phoneNumber}</Header.Subheader>
		</Segment>
	);
}

export default ContactInfo;
