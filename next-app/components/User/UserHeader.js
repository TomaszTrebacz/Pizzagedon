import { Header, Icon, Segment, Label } from 'semantic-ui-react';

function UserHeader({ user }) {
	return (
		<Segment secondary inverted color='black'>
			<Label
				color='orange'
				size='large'
				ribbon
				icon='privacy'
				style={{ textTransform: 'capitalize' }}
			/>
			<Header inverted textAlign='center' as='h1' icon>
				<Icon name='user' />
				{user.name} {user.surname}
				<Header.Subheader>{user.email}</Header.Subheader>
				<Header.Subheader>
					{user.street} Street {user.postCode} {user.city}
				</Header.Subheader>
				<Header.Subheader>{user.phoneNumber}</Header.Subheader>
			</Header>
		</Segment>
	);
}

export default UserHeader;
