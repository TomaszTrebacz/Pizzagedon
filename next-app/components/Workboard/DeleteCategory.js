import { Segment, Icon, Dropdown, Label } from 'semantic-ui-react';

function DeleteCategory({
	isPermitted,
	categoryId,
	handleDropdown,
	categoriesType,
	loadingMutation,
}) {
	return (
		<>
			{isPermitted && (
				<Segment>
					<Label size='large' color='red' horizontal>
						If you want to delete this category, you have to choose another category to change
						current product category
						<Icon name='close' />
					</Label>
					<Dropdown
						name='categorySelect'
						categoryId={categoryId}
						onChange={handleDropdown}
						placeholder='Change category and delete'
						clearable
						options={categoriesType}
						value={categoriesType.value}
						selection
						loading={loadingMutation}
					/>
				</Segment>
			)}
		</>
	);
}

export default DeleteCategory;
