import { Segment, Header, Button, Icon, Form, Message } from 'semantic-ui-react';

function EditForm({
	error,
	loading,
	disabled,
	handleSubmit,
	user,
	handleChange,
	name,
	surname,
	phoneNumber,
	street,
	postCode,
	city,
}) {
	return (
		<Segment>
			<Header as='h2'>
				<Icon name='edit' color='orange' /> Edit your account
			</Header>
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
						placeholder={name}
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
						placeholder={surname}
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
						placeholder={phoneNumber}
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
						placeholder={street}
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
						placeholder={postCode}
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
						placeholder={city}
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
		</Segment>
	);
}

export default EditForm;
