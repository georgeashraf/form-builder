import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';

export function useGenericMutation<RType, RData>(
  handlerFunction: (...args: any) => Promise<any>,
  key?: string,
  options?: UseMutationOptions<RType, AxiosError, RData>
) {
  return useMutation(
    (body: RData) => apiHandler<RData>(handlerFunction, body, key),
    {
      onSuccess: (...params) => {
        options?.onSuccess?.(...params);
      },
      onError: (error: AxiosError<unknown, any>, ...params) => {
        options?.onError?.(error, ...params);
      },
    }
  );
}

function apiHandler<RData>(
  handlerFunction: (...args: any) => Promise<any>,
  body: RData,
  key?: string
) {
  if (key) return handlerFunction(body, key);
  return handlerFunction(body);
}
