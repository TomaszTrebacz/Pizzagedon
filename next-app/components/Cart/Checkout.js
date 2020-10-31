import { Card, Segment, Image, Icon, Button, Message } from 'semantic-ui-react';
import StripeCheckout from 'react-stripe-checkout';

function Checkout({ stripeTotal, email, handleCheckout }) {
	return (
		<Segment>
			<StripeCheckout
				name='Pizzagedon!'
				description='Payment'
				amount={stripeTotal}
				image='/pizza.png'
				currency='EUR'
				billingAddress={false}
				zipCode={false}
				email={email}
				stripeKey={process.env.STRIPE_PUBLISHABLE_KEY}
				token={handleCheckout}
				triggerEvent='onClick'
			>
				<Button color='green'>
					<Icon name='in cart' />
					Check out
				</Button>
			</StripeCheckout>
		</Segment>
	);
}

export default Checkout;
