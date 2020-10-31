import { Label, Segment, Header, Icon, List } from 'semantic-ui-react';
import Link from 'next/link';

function ListOrders({ orders }) {
	return (
		<>
			<Segment>
				{orders.length === 0 ? (
					<Header>
						<Icon name='circle notched' />
						No orders.
					</Header>
				) : (
					<List>
						{orders.map((order) => (
							<Link href='/trackOrder/[id]' as={`/trackOrder/${order.id}`}>
								<List.Item>
									<List.Header as='h3'>
										<Icon name='cart' color='orange' />
										Order ID: {order.id}
										<Label
											content={order.total}
											icon='dollar sign'
											basic
											horizontal
											style={{ marginLeft: '1em' }}
										/>
									</List.Header>
								</List.Item>
							</Link>
						))}
					</List>
				)}
			</Segment>
		</>
	);
}

export default ListOrders;
