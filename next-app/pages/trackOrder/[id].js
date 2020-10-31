import nextCookie from 'next-cookies';
import jwt from 'jsonwebtoken';
import Router, { useRouter } from 'next/router';

import DetailsOrder from '../../components/Orders/DetailsOrder';
import ManageOrder from '../../components/Orders/ManageOrder';

import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import { useMutation } from '@apollo/react-hooks';

import {
	twilioNumber,
	AcceptedMessage,
	CookedMessage,
	DeliveredMessage,
} from '../../utils/messages';

const orderQuery = gql`
	query order($id: UUID!) {
		order(id: $id) {
			id
			content
			total
			Accepted
			Cooked
			Delivered
			phoneNumber
			street
			postCode
			city
		}
	}
`;

const Accepted = gql`
	mutation setAccepted($id: UUID!) {
		setAccepted(id: $id)
	}
`;

const Cooked = gql`
	mutation setCooked($id: UUID!) {
		setCooked(id: $id)
	}
`;

const Delivered = gql`
	mutation setDelivered($id: UUID!) {
		setDelivered(id: $id)
	}
`;

const id = ({ userId }) => {
	const router = useRouter();
	const { id } = router.query;

	const [loadingAccepted, setLoadingAccepted] = React.useState(false);
	const [loadingCooked, setLoadingCooked] = React.useState(false);
	const [loadingDelivered, setLoadingDelivered] = React.useState(false);

	const [successAccepted, setSuccessAccepted] = React.useState(false);
	const [successCooked, setSuccessCooked] = React.useState(false);
	const [successDelivered, setSuccessDelivered] = React.useState(false);

	const [setAccepted] = useMutation(Accepted);
	const [setCooked] = useMutation(Cooked);
	const [setDelivered] = useMutation(Delivered);

	const { data, loading, error } = useQuery(orderQuery, {
		variables: { id: id },
	});

	if (loading) return 'Loading...';
	if (error) return `Error!: ${error}`;

	const isAccepted = data.order.Accepted;
	const isCooked = data.order.Cooked;
	const isDelivered = data.order.Delivered;

	async function setAcceptedButton(event, { id }) {
		event.preventDefault();
		try {
			setLoadingAccepted(true);

			// db
			await setAccepted({ variables: { id } });

			// sms
			const sendData = {
				message: AcceptedMessage,
				phoneNumber: data.order.phoneNumber,
				twilioNumber: twilioNumber,
			};

			await fetch('../api/twilio', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(sendData),
			});

			setSuccessAccepted(true);
		} catch (error) {
			catchErrors(error, window.alert);
		} finally {
			setLoadingAccepted(false);
		}
	}

	async function setCookedButton(event, { id }) {
		event.preventDefault();
		try {
			setLoadingCooked(true);

			// db
			await setCooked({ variables: { id } });

			// sms
			const sendData = {
				message: CookedMessage,
				phoneNumber: data.order.phoneNumber,
				twilioNumber: twilioNumber,
			};

			await fetch('../api/twilio', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(sendData),
			});

			setSuccessCooked(true);
		} catch (error) {
			catchErrors(error, window.alert);
		} finally {
			setLoadingCooked(false);
		}
	}

	async function setDeliveredButton(event, { id }) {
		event.preventDefault();
		try {
			setLoadingDelivered(true);

			// db
			await setDelivered({ variables: { id } });

			// sms
			const sendData = {
				message: DeliveredMessage,
				phoneNumber: data.order.phoneNumber,
				twilioNumber: twilioNumber,
			};

			await fetch('../api/twilio', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(sendData),
			});

			setSuccessDelivered(true);
		} catch (error) {
			catchErrors(error, window.alert);
		} finally {
			setLoadingDelivered(false);
		}
	}

	return (
		<>
			<DetailsOrder order={data.order} />
			<ManageOrder
				id={data.order.id}
				setAcceptedButton={setAcceptedButton}
				loadingAccepted={loadingAccepted}
				successAccepted={successAccepted}
				isAccepted={isAccepted}
				setCookedButton={setCookedButton}
				loadingCooked={loadingCooked}
				successCooked={successCooked}
				isCooked={isCooked}
				setDeliveredButton={setDeliveredButton}
				loadingDelivered={loadingDelivered}
				successDelivered={successDelivered}
				isDelivered={isDelivered}
			/>
		</>
	);
};

id.getInitialProps = async (ctx) => {
	const { token } = nextCookie(ctx);

	if (!token) {
		typeof window !== 'undefined'
			? Router.push('/login')
			: ctx.res.writeHead(302, { Location: '/login' }).end();
	}

	const { userId } = jwt.verify(token, process.env.JWT);

	return { userId };
};

export default id;
