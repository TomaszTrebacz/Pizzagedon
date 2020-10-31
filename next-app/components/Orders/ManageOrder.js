import { Segment, Header, Button, Icon } from 'semantic-ui-react';

function ManageOrder({
	id,
	setAcceptedButton,
	loadingAccepted,
	successAccepted,
	isAccepted,
	setCookedButton,
	loadingCooked,
	successCooked,
	isCooked,
	setDeliveredButton,
	loadingDelivered,
	successDelivered,
	isDelivered,
}) {
	return (
		<Segment>
			<Header as='h2'>
				<Icon name='setting' color='orange' /> Manage Order
			</Header>
			<Button
				color='green'
				inverted
				size='large'
				style={{ marginLeft: '1em' }}
				id={id}
				onClick={setAcceptedButton}
				loading={loadingAccepted}
				active={successAccepted}
				disabled={isAccepted}
			>
				<Icon name='share' /> Set Accepted
			</Button>
			<Button
				color='blue'
				inverted
				size='large'
				style={{ marginLeft: '1em' }}
				id={id}
				onClick={setCookedButton}
				loading={loadingCooked}
				active={successCooked}
				disabled={isCooked}
			>
				<Icon name='clock outline' /> Set Cooked
			</Button>
			<Button
				color='brown'
				inverted
				size='large'
				style={{ marginLeft: '1em' }}
				id={id}
				onClick={setDeliveredButton}
				loading={loadingDelivered}
				active={successDelivered}
				disabled={isDelivered}
			>
				<Icon name='truck' /> Set Delivered
			</Button>
		</Segment>
	);
}

export default ManageOrder;
