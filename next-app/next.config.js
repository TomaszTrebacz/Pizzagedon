require('dotenv').config();

module.exports = {
	env: {
		SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
		TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
		TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
		STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
		STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
		CLOUDINARY_URL: process.env.CLOUDINARY_URL,
		JWT: process.env.JWT,
	},
};
