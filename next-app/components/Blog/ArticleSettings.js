import { Segment, Header, Button, Icon } from 'semantic-ui-react';

function ArticleSettings({ article, deleteArticleButton }) {
	return (
		<>
			<Segment>
				<Header>
					You can also{' '}
					<Button color='red' id={article.id} onClick={deleteArticleButton}>
						<Icon name='cart plus' />
						Delete Article
					</Button>
				</Header>
			</Segment>
		</>
	);
}
export default ArticleSettings;
