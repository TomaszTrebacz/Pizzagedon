import { Card, Segment, Image, Icon, Button } from 'semantic-ui-react';

function ListCartProducts({ loading, products, deleteButton }) {
	return (
		<Segment loading={loading}>
			<Card.Group>
				{products.map((product) => (
					<Card fluid color='orange'>
						<Image src={product.imageUrl} size='medium' />
						<Card.Content>
							<Card.Header>{product.name}</Card.Header>
							<Card.Description>{product.description}</Card.Description> {product.price}
						</Card.Content>
						<Card.Content extra>
							<a>
								<Icon name='euro sign' />
								Price: {product.price}
							</a>
							{'  '}
							<a>
								<Icon name='sort' />
								Quantity: {product.quantity}
							</a>
							{'     '}
							<a>
								<Button color='red' product={product} onClick={deleteButton}>
									<Icon name='delete' />
									Delete from cart
								</Button>
							</a>
						</Card.Content>
					</Card>
				))}
			</Card.Group>
		</Segment>
	);
}

export default ListCartProducts;
