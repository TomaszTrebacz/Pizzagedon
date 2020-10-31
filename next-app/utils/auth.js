import Router from 'next/router';
import cookie from 'js-cookie';

export const login = ({ token }) => {
	cookie.set('token', token, { expires: 1 });
	Router.push('/');
};

export const logout = () => {
	cookie.remove('token');
	Router.push('/login');
};

export const isAdminOrRoot = (role) => {
	let isPermitted;

	const isRoot = role === 'root';
	const isAdmin = role === 'admin';

	if (isRoot || isAdmin) {
		isPermitted = true;
	} else {
		isPermitted = false;
	}

	if (!isPermitted) {
		Router.push('/');
	}
};

export const isPermittedToWorkboard = (role) => {
	let isPermitted;

	const isRoot = role === 'root';
	const isAdmin = role === 'admin';
	const isWorker = role === 'worker';
	const isDeliverer = role === 'deliverer';
	const isWriter = role === 'writer';

	if (isRoot || isAdmin || isWorker || isDeliverer || isWriter) {
		isPermitted = true;
	} else {
		isPermitted = false;
	}

	if (!isPermitted) {
		Router.push('/');
	}
};

export const isWorker = (role) => {
	let isPermitted;

	const isRoot = role === 'root';
	const isAdmin = role === 'admin';
	const isWorker = role === 'worker';

	if (isRoot || isAdmin || isWorker) {
		isPermitted = true;
	} else {
		isPermitted = false;
	}

	if (!isPermitted) {
		Router.push('/');
	}
};

export const isDeliverer = (role) => {
	let isPermitted;

	const isRoot = role === 'root';
	const isAdmin = role === 'admin';
	const isDeliverer = role === 'deliverer';

	if (isRoot || isAdmin || isDeliverer) {
		isPermitted = true;
	} else {
		isPermitted = false;
	}

	if (!isPermitted) {
		Router.push('/');
	}
};

export const isWriter = (role) => {
	let isPermitted;

	const isRoot = role === 'root';
	const isAdmin = role === 'admin';
	const isWriter = role === 'writer';

	if (isRoot || isAdmin || isWriter) {
		isPermitted = true;
	} else {
		isPermitted = false;
	}

	if (!isPermitted) {
		Router.push('/');
	}
};
