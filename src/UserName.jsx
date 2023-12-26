import { useUserQuery } from './hooks/useUserQuery';

export default function UserName() {
	const result = useUserQuery(1);
	return (
		<div className='UserName'>
			<h1>User Name</h1>
		</div>
	);
}
