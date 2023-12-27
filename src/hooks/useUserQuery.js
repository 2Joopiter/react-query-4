import { useQuery } from '@tanstack/react-query';

const fetchUser = async ({ queryKey }) => {
	const response = await fetch(`https://jsonplaceholder.typicode.com/users/${queryKey[1]}`);
	return await response.json();
};

export const useUserQuery = (num) => {
	// useQuery에 첫번째 인수로 넣는 값은 무조건 fetching 함수로 전달됨.
	// useQuery는 쿼리키가 동일하면 같은 데이터라고 인지하기 때문에 refecthing 처리 안함
	return useQuery(['users', num], fetchUser, { refetchOnWindowFocus: false, refetchOnMount: false, cacheTime: 1000 * 5, staleTime: 1000 * 5 });
};

/*
	refetchOnMount: 라우터만 이동하거나 하는 경우에는 재패칭이 일어나지 않고 캐치타임이 남아있으면 있는 캐시를 가져옴 
	cacheTime: 해당 데이터를 컴포넌트에서 활용하지 않을 때, 얼마동안 캐시에서 삭제시키지 않을지에 대한 시간값 설정 (얼마동안 garbage collector에서의 데이터 삭제를 방지시킬지)(여기서 cache는 윈도우X react-query의 cache)
	staleTime: 얼마동안 refetching을 하지 않을지에 대한 시간값 설정 (fresh 상태로 동결시킴). 이후 cacheTime이 없으면 데이터를 삭제.  

	stealTime이 전부 소진되면 cacheTime으로 넘어가 소진
	둘은 용법이 다름. stealTime은 refetching을 방지, cacheTime은 캐시 데이터 삭제 방지
*/
