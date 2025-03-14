import { memo } from 'react';

const Iframe = memo(() => {
	return <iframe src="http://localhost:3000/" />;
});

export default Iframe;