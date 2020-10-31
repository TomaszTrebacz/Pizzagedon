import Stripe from 'stripe';
import { v4 as uuidv4 } from 'uuid';

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
	const { paymentData, stripeTotal } = req.body;
	try {
		const prevCustomer = await stripe.customers.list({
			email: paymentData.email,
			limit: 1,
		});

		// is email linked with existing Stripe customer?
		const isExistingCustomer = prevCustomer.data.length > 0;

		// if not, create them
		let newCustomer;
		if (!isExistingCustomer) {
			newCustomer = await stripe.customers.create({
				email: paymentData.email,
				source: paymentData.id,
			});
		}
		const customer = (isExistingCustomer && prevCustomer.data[0].id) || newCustomer.id;

		// create charge & send email
		await stripe.charges.create(
			{
				currency: 'EUR',
				amount: stripeTotal,
				receipt_email: paymentData.email,
				customer,
				description: `Checkout | ${paymentData.email} | ${paymentData.id}`,
			},
			{
				idempotencyKey: uuidv4(),
			}
		);

		// send back success
		res.status(200).send('Checkout successful');
	} catch (error) {
		console.log(error);
		res.status(500).send('Error processing charge');
	}
};
