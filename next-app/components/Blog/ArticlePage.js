import { Item, Label, Segment, Header, Button, Icon } from 'semantic-ui-react';

function ArticlePage({ article }) {
	return (
		<Segment>
			<Item.Group>
				<Item>
					<Item.Content>
						<Item.Header>
							<Header size='huge'>{article.title}</Header>
						</Item.Header>
						<Item.Description>
							<p>{article.content}</p>
						</Item.Description>
					</Item.Content>
				</Item>
			</Item.Group>
		</Segment>
	);
}

export default ArticlePage;
