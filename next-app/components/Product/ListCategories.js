import { Icon, Image, List, Header } from 'semantic-ui-react';
import Link from 'next/link';

function ListCategories({ categories }) {
	return (
		<>
			<Header as='h2'>
				<Icon name='food' />
				<Header.Content>Food Categories</Header.Content>
			</Header>

			<List selection verticalAlign='middle'>
				{categories.map((category) => (
					<Link href='/categories/[id]' as={`/categories/${category.id}`}>
						<List.Item>
							<Image avatar src={category.iconName} />
							<List.Content>
								<List.Header>{category.name}</List.Header>
							</List.Content>
						</List.Item>
					</Link>
				))}
			</List>
		</>
	);
}

export default ListCategories;
