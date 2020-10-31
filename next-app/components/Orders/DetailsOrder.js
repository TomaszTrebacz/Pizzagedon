import { Icon, Step, Segment, Grid, Header, Label } from 'semantic-ui-react';

function DetailsOrder({ order }) {
	return (
		<Segment>
			<Grid container columns={2} stretched>
				<Grid.Column>
					<Step.Group vertical>
						<Step active>
							<Icon name='payment' />
							<Step.Content>
								<Step.Title>Paid</Step.Title>
								<Step.Description>Order was paid</Step.Description>
							</Step.Content>
						</Step>

						{!order.Accepted ? (
							<Step>
								<Icon name='share' />
								<Step.Content>
									<Step.Title>Accepted</Step.Title>
									<Step.Description>Order was accepted </Step.Description>
								</Step.Content>
							</Step>
						) : (
							<Step active>
								<Icon name='share' />
								<Step.Content>
									<Step.Title>Accepted</Step.Title>
									<Step.Description>Order was accepted </Step.Description>
								</Step.Content>
							</Step>
						)}

						{!order.Cooked ? (
							<Step>
								<Icon name='clock outline' />
								<Step.Content>
									<Step.Title>Cooked</Step.Title>
									<Step.Description>Order was cooked </Step.Description>
								</Step.Content>
							</Step>
						) : (
							<Step active>
								<Icon name='clock outline' />
								<Step.Content>
									<Step.Title>Cooked</Step.Title>
									<Step.Description>Order was cooked </Step.Description>
								</Step.Content>
							</Step>
						)}

						{!order.Delivered ? (
							<Step>
								<Icon name='truck' />
								<Step.Content>
									<Step.Title>Shipping</Step.Title>
									<Step.Description>Order was delivered.</Step.Description>
								</Step.Content>
							</Step>
						) : (
							<Step active>
								<Icon name='truck' />
								<Step.Content>
									<Step.Title>Shipping</Step.Title>
									<Step.Description>Order was taken by deliverer.</Step.Description>
								</Step.Content>
							</Step>
						)}
					</Step.Group>
				</Grid.Column>

				<Grid.Column>
					<Segment secondary inverted color='black'>
						<Label
							color='orange'
							size='large'
							ribbon
							icon='info'
							style={{ textTransform: 'capitalize' }}
						/>
						<Header inverted textAlign='center' as='h2' icon>
							<Icon name='food' />
							{order.id}
						</Header>
						<Header inverted textAlign='center' as='h2' icon>
							Content:
							<Header.Subheader>
								<Label basic horizontal>
									{order.content}
								</Label>
							</Header.Subheader>
						</Header>
						<Header inverted textAlign='center' as='h2' icon>
							Details:
							<Header.Subheader>Phone Number: {order.phoneNumber}</Header.Subheader>
							<Header.Subheader>Street: {order.street}</Header.Subheader>
							<Header.Subheader>Post Code: {order.postCode}</Header.Subheader>
							<Header.Subheader>City: {order.city}</Header.Subheader>
						</Header>
					</Segment>
				</Grid.Column>
			</Grid>
		</Segment>
	);
}

export default DetailsOrder;
