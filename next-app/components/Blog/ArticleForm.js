import { Segment, Header, Button, Icon, Form, Message } from 'semantic-ui-react';

function ArticleForm({
	error,
	loading,
	disabled,
	handleSubmit,
	article,
	handleChange,
	title,
	content,
}) {
	return (
		<>
			<>
				<Segment>
					<Header as='h2'>
						<Icon name='edit' color='orange' /> Edit your post
					</Header>
					<Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
						<Message error header='Oops!' content={error} />
						<Segment>
							<Form.Input
								fluid
								icon='user'
								iconPosition='left'
								label='title'
								placeholder='title'
								name='title'
								value={article.title}
								onChange={handleChange}
								placeholder={title}
							/>
							<Form.Input
								fluid
								icon='user'
								iconPosition='left'
								label='content'
								placeholder='content'
								name='content'
								value={article.content}
								onChange={handleChange}
								placeholder={content}
							/>
							<Button
								disabled={disabled || loading}
								icon='add'
								type='submit'
								color='orange'
								content='Submit'
							/>
						</Segment>
					</Form>
				</Segment>
			</>
		</>
	);
}

export default ArticleForm;
