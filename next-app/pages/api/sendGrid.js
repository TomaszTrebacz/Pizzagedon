const sgMail = require('@sendgrid/mail');

export default async function (req, res) {
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);

	const { sendGridEmail, registerTitle, registerMessage, email } = req.body;

	const msg = {
		to: email,
		from: sendGridEmail,
		subject: registerTitle,
		text: registerMessage,
		html: `<p>${registerMessage}`,
	};

	try {
		(async () => {
			await sgMail.send(msg);
		})();
		res.status(200).send('Message sent successfully.');
	} catch (error) {
		console.log('ERROR', error);
		res.status(400).send('Message not sent.');
	}
}
