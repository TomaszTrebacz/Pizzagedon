import NProgress from 'nprogress';
import nextCookie from 'next-cookies';
import { logout } from '../../utils/auth';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';

import { Menu, Button, Header, Image, Icon } from 'semantic-ui-react';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function _Header(ctx) {
	const router = useRouter();

	const { token } = nextCookie(ctx);

	let isLogged;

	if (token) {
		isLogged = true;
	} else {
		isLogged = false;
	}

	function isActive(route) {
		return route === router.pathname;
	}

	return (
		<>
			<Header as='h1' style={{ padding: '1em 0 0.5em 0' }} floated='left'>
				<Image src='/pizza.png' />
				<Header.Content>
					<b>Pizzagedon!</b>
					<Header.Subheader>We speak good food language</Header.Subheader>
				</Header.Content>
			</Header>

			<Header as='h1' style={{ padding: '1em 0 0.5em 0' }} floated='right'>
				<Icon circular name='user' />

				{isLogged ? (
					<Header.Content>
						<Link href='/myAccount'>
							<Button fluid icon='setting' content='My account' />
						</Link>
						<Header.Subheader>
							<Button
								fluid
								icon='sign out alternate'
								content='Log out'
								sign
								out
								alternate
								floated='right'
								onClick={logout}
							></Button>
						</Header.Subheader>
					</Header.Content>
				) : (
					<Header.Content>
						<Link href='/login'>
							<Button fluid icon='sign in alternate' content='Log in' />
						</Link>
						<Header.Subheader>
							<Link href='/register'>
								<Button fluid icon='unlock' content='Register' />
							</Link>
						</Header.Subheader>
					</Header.Content>
				)}
			</Header>

			<Menu fluid id='menu' inverted pointing secondary>
				<Link href='/'>
					<Menu.Item header active={isActive('/')}>
						<Icon name='home' size='large' />
						Home
					</Menu.Item>
				</Link>
				{isLogged && (
					<>
						<Link href='/cart'>
							<Menu.Item header active={isActive('/cart')}>
								<Icon name='cart' size='large' />
								Cart
							</Menu.Item>
						</Link>

						<Link href='/trackOrder/index'>
							<Menu.Item header active={isActive('/trackOrder/index')}>
								<Icon name='street view' size='large' />
								Track Order
							</Menu.Item>
						</Link>

						<Link href='/myAccount'>
							<Menu.Item header active={isActive('/myAccount')}>
								<Icon name='setting' size='large' />
								My Account
							</Menu.Item>
						</Link>

						<Link href='/workboard/index'>
							<Menu.Item header active={isActive('/workboard/index')}>
								<Icon name='lock' size='large' />
								WORKBOARD
							</Menu.Item>
						</Link>
					</>
				)}

				<Link href='/blog'>
					<Menu.Item header active={isActive('/blog')}>
						<Icon name='book' size='large' />
						Blog
					</Menu.Item>
				</Link>

				<Link href='/contact'>
					<Menu.Item header active={isActive('/contact')}>
						<Icon name='phone' size='large' />
						Contact
					</Menu.Item>
				</Link>
			</Menu>
		</>
	);
}

export default _Header;
