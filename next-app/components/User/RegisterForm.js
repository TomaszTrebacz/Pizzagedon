import { Segment, Button, Form, Icon, Message } from 'semantic-ui-react';
import Link from 'next/link';

function RegisterForm({ error, loading, handleSubmit, user, handleChange, disabled }) {
	return (
		<>
			<Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
				<Message error header='Oops!' content={error} />
				<Segment>
					<Form.Input
						fluid
						icon='user'
						iconPosition='left'
						label='Name'
						placeholder='Name'
						name='name'
						value={user.name}
						onChange={handleChange}
					/>
					<Form.Input
						fluid
						icon='user'
						iconPosition='left'
						label='surname'
						placeholder='surname'
						name='surname'
						value={user.surname}
						onChange={handleChange}
					/>
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
					<Form.Input
						fluid
						icon='phone'
						iconPosition='left'
						label='Number phone'
						placeholder='Number phone'
						name='phoneNumber'
						type='text'
						value={user.phoneNumber}
						onChange={handleChange}
					/>
					<Form.Input
						fluid
						icon='street view'
						iconPosition='left'
						label='Street'
						placeholder='Street'
						name='street'
						type='text'
						value={user.street}
						onChange={handleChange}
					/>
					<Form.Input
						fluid
						icon='address book'
						iconPosition='left'
						label='postCode'
						placeholder='postCode'
						name='postCode'
						type='text'
						value={user.postCode}
						onChange={handleChange}
					/>
					<Form.Input
						fluid
						icon='home'
						iconPosition='left'
						label='City'
						placeholder='City'
						name='city'
						type='text'
						value={user.city}
						onChange={handleChange}
					/>
					<Button
						disabled={disabled || loading}
						icon='signup'
						type='submit'
						color='orange'
						content='Signup'
					/>
				</Segment>
			</Form>
			<Message attached='bottom' warning>
				<Icon name='help' />
				Existing user?{' '}
				<Link href='/login'>
					<a>Log in here</a>
				</Link>{' '}
				instead.
			</Message>
		</>
	);
}

export default RegisterForm;
