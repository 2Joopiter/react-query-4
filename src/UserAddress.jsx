import { useUserQuery } from './hooks/useUserQuery';

export default function UserAddress() {
	const result = useUserQuery();
	return (
		<div className='UserAddress'>
			<h1>User Address</h1>
		</div>
	);
}
