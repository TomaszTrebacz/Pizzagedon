import { Segment, Header, List, Label, Icon } from 'semantic-ui-react';
import { isAdminOrRoot, isWorker, isDeliverer, isWriter } from '../../utils/auth';

import Link from 'next/link';

function IndexMenu({ role }) {
	return (
		<>
			<Segment>
				<Label as='a' color='black' size='large' ribbon basic>
					<Icon name='user secret' />
					You are logged as {role}
				</Label>
				<Header>WORKBOARD</Header>
				<List>
					{isAdminOrRoot && (
						<>
							<List.Item>
								<Link href='/workboard/currentOrders'>
									<a>All Current Orders</a>
								</Link>
							</List.Item>
							<List.Item>
								<Link href='/workboard/finishedOrders'>
									<a>All Finished Orders</a>
								</Link>
							</List.Item>
							<List.Item>
								<Link href='/workboard/manageUsers'>
									<a>Manage Users</a>
								</Link>
							</List.Item>
							<List.Item>
								<Link href='/workboard/addProduct'>
									<a>Add Product</a>
								</Link>
							</List.Item>
							<List.Item>
								<Link href='/workboard/addProductCategory'>
									<a>Add Category</a>
								</Link>
							</List.Item>
						</>
					)}
					<br />
					{isWriter && (
						<List.Item>
							<Link href='/workboard/addArticle'>
								<a>Add Article</a>
							</Link>
						</List.Item>
					)}
					<br />
					{isWorker && (
						<>
							<List.Item>
								<Link href='/workboard/toAcceptOrders'>
									<a>Orders to Accept</a>
								</Link>
							</List.Item>
							<List.Item>
								<Link href='/workboard/toCookOrders'>
									<a>Orders to Cook</a>
								</Link>
							</List.Item>
						</>
					)}
					{isDeliverer && (
						<List.Item>
							<Link href='/workboard/toDeliverOrders'>
								<a>Orders to Deliver</a>
							</Link>
						</List.Item>
					)}
				</List>
			</Segment>
		</>
	);
}

export default IndexMenu;
