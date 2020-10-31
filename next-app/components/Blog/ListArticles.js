import { Item, Header } from 'semantic-ui-react';
import formatDate from '../../utils/formatDate';
import Link from 'next/link';

function ListArticles({ articles }) {
	return (
		<React.Fragment>
			{articles.length === 0 ? (
				<Header>No products</Header>
			) : (
				<Item.Group>
					{articles.map((article) => (
						<Item>
							<Item.Content>
								<Item.Header as='a'>{article.title}</Item.Header>
								<Item.Meta>{formatDate(article.createdAt)}</Item.Meta>
								<Item.Description>{article.content}</Item.Description>
								<Item.Extra>
									<Link href='/articles/[id]' as={`/articles/${article.id}`}>
										Read more
									</Link>
								</Item.Extra>
							</Item.Content>
						</Item>
					))}
				</Item.Group>
			)}
		</React.Fragment>
	);
}

export default ListArticles;
