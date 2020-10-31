import { Segment, Header, Image } from 'semantic-ui-react';

function ImageTitle({ title, image }) {
	return (
		<Segment>
			<Header as='h2'>
				<Image avatar src={image} />
				{title}
			</Header>
		</Segment>
	);
}

export default ImageTitle;
