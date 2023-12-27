import { Link } from 'react-router-dom';

export default function Menu() {
	return (
		<ul className='Menu'>
			<li>
				<Link to='/'>Menu</Link>
			</li>
			<li>
				<Link to='/name'>User Name</Link>
			</li>
		</ul>
	);
}
