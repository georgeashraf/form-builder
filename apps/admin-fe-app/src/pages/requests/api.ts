import { axiosApiInstance } from '../../axiosInstance';

const selectColumnsMap = new Map<string, string>([
  ['id', 'group.id'],
  ['name', 'group.name'],
  ['description', 'group.description'],
]);
export const listRequests = async () => {
  return await axiosApiInstance.get('/requests', { withCredentials: true });
};

export const createRequests = async (data: any) => {
  return await axiosApiInstance.post('/requests', data, {
    withCredentials: true,
  });
};

export const findRequest = async (data: Partial<any>) => {
  return await axiosApiInstance.get(`/requests/${data.key}`, {
    withCredentials: true,
  });
};
