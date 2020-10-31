import { Button, Form, Icon, Message, Segment } from 'semantic-ui-react';
import Link from 'next/link';

function LoginForm({ error, loading, handleSubmit, user, handleChange, disabled }) {
	return (
		<>
			<Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
				<Message error header='Oops!' content={error} />
				<Segment>
					<Form.Input
						fluid
						icon='envelope'
						iconPosition='left'
						label='Email'
						placeholder='Email'
						name='email'
						type='email'
						value={user.email}
						onChange={handleChange}
					/>
					<Form.Input
						fluid
						icon='lock'
						iconPosition='left'
						label='Password'
						placeholder='Password'
						name='password'
						type='password'
						value={user.password}
						onChange={handleChange}
					/>
					<Button
						disabled={disabled || loading}
						icon='sign in'
						type='submit'
						color='orange'
						content='Login'
					/>
				</Segment>
			</Form>
			<Message attached='bottom' warning>
				<Icon name='help' />
				New user?{' '}
				<Link href='/register'>
					<a>Register here.</a>
				</Link>
			</Message>
		</>
	);
}

export default LoginForm;
