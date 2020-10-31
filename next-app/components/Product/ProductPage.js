import { Item, Label, Segment, Header, Button, Icon } from 'semantic-ui-react';

function ProductPage({ product, deletePermissions, addProductCartButton, deleteProductButton }) {
	return (
		<Segment>
			<Item.Group>
				<Item>
					<Item.Image size='small' src={product.imageUrl} />
					<Item.Content>
						<Item.Header>
							<Header size='huge'>
								{product.name}
								<p>
									<Label color='orange' size='large'>
										<Icon name='euro sign' />
										Price: {product.price}
									</Label>
								</p>
							</Header>
						</Item.Header>
						<Item.Description>
							<Item.Extra></Item.Extra>
							<p>{product.description}</p>
						</Item.Description>
						<Item.Extra>
							<Button color='green' productId={product.id} onClick={addProductCartButton}>
								<Icon name='cart plus' />
								Add to cart
							</Button>
							{deletePermissions && (
								<Button color='red' id={product.id} onClick={deleteProductButton}>
									<Icon name='cart plus' />
									Delete Product
								</Button>
							)}
						</Item.Extra>
					</Item.Content>
				</Item>
			</Item.Group>
		</Segment>
	);
}

export default ProductPage;
