import { Segment, Table, Dropdown } from 'semantic-ui-react';

function UsersTable({ allUsers, handleDropdown, rolesType, loadingMutation, successMutation }) {
	return (
		<Segment>
			<Table compact celled definition size='small'>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell />
						<Table.HeaderCell>Role</Table.HeaderCell>
						<Table.HeaderCell>E-mail</Table.HeaderCell>
						<Table.HeaderCell>Name</Table.HeaderCell>
						<Table.HeaderCell>Surname</Table.HeaderCell>
						<Table.HeaderCell>Street</Table.HeaderCell>
						<Table.HeaderCell>Postal Code</Table.HeaderCell>
						<Table.HeaderCell>City</Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{allUsers.map((user) => (
						<Table.Row>
							<Table.Cell>
								<Dropdown
									name='roleSelect'
									id={user.id}
									onChange={handleDropdown}
									placeholder='Change role'
									clearable
									options={rolesType}
									value={rolesType.value}
									selection
									loading={loadingMutation}
									active={successMutation}
								/>
							</Table.Cell>
							<Table.Cell>{user.role}</Table.Cell>
							<Table.Cell>{user.email}</Table.Cell>
							<Table.Cell>{user.name}</Table.Cell>
							<Table.Cell>{user.surname}</Table.Cell>
							<Table.Cell>{user.street}</Table.Cell>
							<Table.Cell>{user.postCode}</Table.Cell>
							<Table.Cell>{user.city}</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</Segment>
	);
}

export default UsersTable;
