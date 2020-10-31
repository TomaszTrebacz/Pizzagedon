import { Button, Form, Image, Message, Segment, Dropdown } from 'semantic-ui-react';

function ProductForm({
	success,
	error,
	disabled,
	loading,
	handleChange,
	handleSubmit,
	handleDropdown,
	categoriesType,
	product,
	imagePreview,
}) {
	return (
		<>
			<Message
				attached
				icon='add'
				header='Add product'
				content='Fill in all fields below'
				color='orange'
			/>
			<Form success={success} error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
				<Message error header='Oops!' content={error} />
				<Message success icon='check' header='Success!' content='Your product has been posted' />
				<Segment>
					<Dropdown
						name='roleSelect'
						onChange={handleDropdown}
						placeholder='Category'
						clearable
						options={categoriesType}
						value={categoriesType.value}
						selection
					/>
					<Form.Input
						fluid
						label='Name'
						placeholder='name'
						name='name'
						type='text'
						value={product.name}
						onChange={handleChange}
					/>
					<Form.Input
						fluid
						label='Description'
						placeholder='description'
						name='description'
						type='text'
						value={product.description}
						onChange={handleChange}
					/>
					<Form.Input
						fluid
						label='Price'
						placeholder='price'
						name='price'
						type='text'
						value={product.price}
						onChange={handleChange}
					/>
					<Form.Input
						fluid
						label='Image'
						name='image'
						type='file'
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
						content='Add product'
					/>
				</Segment>
			</Form>
		</>
	);
}

export default ProductForm;
