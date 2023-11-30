import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

export function useGenericQuery<RType>(
  handlerFunction: (...args: any) => Promise<any>,
  queryKey: string,
  params: any,
  options?: UseQueryOptions<RType, AxiosError<{ message: string }>>
) {
  useQuery<RType, AxiosError<{ message: string }>>(
    queryKey,
    () => queryFn(params, handlerFunction),
    {
      keepPreviousData: false,
      ...options,
    }
  );
}

const queryFn = (
  params: any,
  handlerFunction: (...args: any) => Promise<any>
) => handlerFunction(params);

// export function useInvalidateMilestones() {
//   const queryClient = useQueryClient();
//   return () =>
//     queryClient.invalidateQueries<Milestone[]>(['package-milestones']);
// }
