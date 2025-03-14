import { QueryFunction, useQuery } from "@tanstack/react-query";
interface ReturnData {
	[e: string]: unknown
}
export const useFetchData = () => {
	const queryFn: QueryFunction<ReturnData> = async () => {
		const response = await fetch(
			'https://api.github.com/repos/TanStack/query',
		)
		return await response.json();
	}
	const queryKey = ["repoData"]
	return useQuery({
		queryKey,
		queryFn,
	})
}