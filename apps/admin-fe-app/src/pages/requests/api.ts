import { axiosApiInstance } from '../../axiosInstance';
import {
  CreateRequestType,
  RequestModel,
  RequestQueryType,
} from '@engine/shared-types';

export const listRequests = async (params: RequestQueryType) => {
  return await axiosApiInstance.get('/requests', {
    withCredentials: true,
    params,
  });
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
