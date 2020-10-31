import { Button, Form, Image, Message, Segment } from 'semantic-ui-react';

function CategoryForm({
	success,
	error,
	loading,
	disabled,
	handleSubmit,
	handleChange,
	productCategory,
	imagePreview,
}) {
	return (
		<>
			<Message
				attached
				icon='add'
				header='Add category'
				content='Fill in all fields below'
				color='orange'
			/>
			<Form success={success} error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
				<Message error header='Oops!' content={error} />
				<Message success icon='check' header='Success!' content='Your category has been posted' />
				<Segment>
					<Form.Input
						fluid
						label='Name'
						placeholder='name'
						name='name'
						type='text'
						value={productCategory.name}
						onChange={handleChange}
					/>
					<Form.Input
						fluid
						name='image'
						type='file'
						label='Image'
						accept='image/*'
						content='Select Image'
						onChange={handleChange}
					/>
					<Image src={imagePreview} rounded centered size='small' />
					<Button
						disabled={disabled || loading}
						icon='save'
						type='submit'
						color='orange'
						content='Add category'
					/>
				</Segment>
			</Form>
		</>
	);
}

export default CategoryForm;
