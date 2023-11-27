import { axiosApiInstance } from '../../axiosInstance';
import {
  CreateRequest, RequestModel,
} from '@engine/shared-types';
const selectColumnsMap = new Map<string, string>([
  ['id', 'group.id'],
  ['name', 'group.name'],
  ['description', 'group.description'],
]);
export const listRequests = async () => {
  return await axiosApiInstance.get('/requests', { withCredentials: true });
};

export const createRequests = async (data: CreateRequest) => {
  return await axiosApiInstance.post('/requests', data, {
    withCredentials: true,
  });
};

export const findRequest = async (data: Partial<RequestModel>) => {
  return await axiosApiInstance.get(`/requests/${data.key}`, {
    withCredentials: true,
  });
};
