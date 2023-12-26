import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Route } from 'react-router-dom';
import Menu from './Menu';
import Main from './Main';
import UserName from './UserName';
import UserAddress from './UserAddress';

function App() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<Menu />
			<Route exact path='/' component={Main} />
			<Route exact path='/name' component={UserName} />
			<Route exact path='/address' component={UserAddress} />
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}

export default App;
