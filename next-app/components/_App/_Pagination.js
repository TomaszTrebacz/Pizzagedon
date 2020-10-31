import { useRouter } from 'next/router';
import { Container, Pagination } from 'semantic-ui-react';

function _Pagination({ totalPages, pageNumber }) {
	const router = useRouter();

	return (
		<Container textAlign='center' style={{ margin: '2em' }}>
			<Pagination
				defaultActivePage={1}
				activePage={pageNumber}
				totalPages={totalPages}
				onPageChange={(event, data) => {
					router.push(`/?page=${data.activePage}`);
				}}
			/>
		</Container>
	);
}

export default _Pagination;
