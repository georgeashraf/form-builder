import { axiosApiInstance } from '../../axiosInstance';
import {
  CreateRequestType,
  RequestModel,
} from '@engine/shared-types';

export const listRequests = async () => {
  return await axiosApiInstance.get('/requests', { withCredentials: true });
};

export const createRequests = async (data: CreateRequestType) => {
  return await axiosApiInstance.post('/requests', data, {
    withCredentials: true,
  });
};

export const findRequest = async (data: Partial<RequestModel>) => {
  return await axiosApiInstance.get(`/requests/${data.key}`, {
    withCredentials: true,
  });
};
