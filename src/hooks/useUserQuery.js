import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const fetchUser = async ({ queryKey }) => {
	const response = await fetch(`https://jsonplaceholder.typicode.com/users/`);
	return await response.json();
};

// 데이터 목록 호출 커스텀훅
export const useUserQuery = () => {
	return useQuery(['users'], fetchUser, { refetchOnWindowFocus: false, refetchOnMount: false, cacheTime: 1000 * 5, staleTime: 1000 * 5 });
};

//
const deleteUser = async (num) => {
	const response = await fetch(`https://jsonplaceholder.typicode.com/users/${num[1]}`, {
		method: 'DELETE',
	});
	return await response.json();
};

// 인수로 순번을 받아서 해당 순번의 데이터를 삭제하는 커스텀훅 (서버데이터 변경)
export const useDeleteQuery = () => {
	// 기존 생성한 queryClient 인스턴스를 호출하는 함수
	// 해당 queryClient 인스턴스에서 활용할 수 있는 prototype method인 setQueryData라는 서버데이터 변경 요청값을 등록하는 함수를 가져옴(매서드를 쓰기 위해 가져오는 것)
	const queryClient = useQueryClient();

	// useMutation(비동기데이터 변경함수가 첫번째 인수, 옵션 설정 객체가 2번째 인수)
	// 옵션 결정 객체: {onSuccess: mutate 요청이 성공적으로 수행되면 연결될 핸들러 함수}
	// useMutation 훅이 delete user라는 내부 fetching함수를 호출해서 서버 데이터를 변경 요청함
	return useMutation(
		deleteUser,
		// 서버데이터 변경이 성공시 변경된 서버데이터값을 받아서 다시 고유의 쿼리키로 등록해서 react-query가 관리할 수 있게 함
		// 변경된 데이터를 args로 담아서, args.id라는 새로운 쿼리키에 등록
		{
			onSuccess: (args) => {
				queryClient.setQueryData(['users', args.id], args);
			},
		}
	);
};
