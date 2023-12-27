import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const fetchUser = async ({ queryKey }) => {
	const response = await fetch(`https://jsonplaceholder.typicode.com/users/`);
	return await response.json();
};

// 데이터 목록 호출 커스텀훅
export const useUserQuery = () => {
	return useQuery(['users'], fetchUser, { refetchOnWindowFocus: false, refetchOnMount: false, cacheTime: 1000 * 5, staleTime: 1000 * 5 });
};

// 기존 서버 데이터 업데이트 함수
export const updateUser = async (userName, num) => {
	const response = await fetch(`https://jsonplaceholder.typicode.com/users/${num}`, {
		method: 'PATCH',
		body: JSON.stringify({
			name: userName,
		}),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	});
	const result = await response.json();
	return result;
};

// 데이터 변경 커스텀훅
export const useUpdateUser = () => {
	const queryClient = useQueryClient();

	return useMutation(updateUser, {
		onSuccess: (args) => {
			queryClient.setQueryData(['users', args.id], args);
		},
	});
};

const deleteUser = async (num) => {
	const response = await fetch(`https://jsonplaceholder.typicode.com/users/${num[1]}`, {
		method: 'DELETE',
	});
	return await response.json();
};

// 인수로 순번을 받아서 해당 순번의 데이터를 삭제하는 커스텀훅 (서버데이터 변경)
export const useDeleteQuery = () => {
	const queryClient = useQueryClient();
	return useMutation(deleteUser, {
		onSuccess: (args) => {
			queryClient.setQueryData(['users', args.id], args);
		},
	});
};
