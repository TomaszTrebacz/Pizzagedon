import { Segment, Header, Icon } from 'semantic-ui-react';

function IconTitle({ title, iconName }) {
	return (
		<Segment>
			<Header as='h2'>
				<Icon name={iconName} color='orange' />
				{title}
			</Header>
		</Segment>
	);
}

export default IconTitle;
