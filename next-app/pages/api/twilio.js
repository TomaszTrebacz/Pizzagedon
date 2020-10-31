import twilio from 'twilio';

export default async function (req, res) {
	const { message, phoneNumber, twilioNumber } = req.body;

	const accountSid = process.env.TWILIO_ACCOUNT_SID;
	const authToken = process.env.TWILIO_AUTH_TOKEN;

	const client = new twilio(accountSid, authToken);

	client.messages
		.create({
			body: message,
			to: `+48${phoneNumber}`,
			from: twilioNumber,
		})
		.then(res.status(200).send('Message sent successfully.'));
}
