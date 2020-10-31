import { Card, Icon, Image, Header } from 'semantic-ui-react';
import Link from 'next/link';

function ListProducts({ itemsPerRow, products }) {
	return (
		<>
			{products.length === 0 ? (
				<Header>No products</Header>
			) : (
				<Card.Group itemsPerRow={itemsPerRow}>
					{products.map((product) => (
						<Link href='/products/[id]' as={`/products/${product.id}`}>
							<Card>
								<Image src={product.imageUrl} wrapped ui={false} />
								<Card.Content>
									<Card.Header>{product.name}</Card.Header>
									<Card.Description>{product.description}</Card.Description>
								</Card.Content>
								<Card.Meta textAlign='center'>
									<b>Price: {product.price}</b>
									<Icon name='euro sign' />
								</Card.Meta>
							</Card>
						</Link>
					))}
				</Card.Group>
			)}
		</>
	);
}
export default ListProducts;
