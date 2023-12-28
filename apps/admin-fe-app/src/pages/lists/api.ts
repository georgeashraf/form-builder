import {
  CreateListType,
  ListModelType,
  ListQueryType,
} from '@engine/shared-types';
import { axiosApiInstance } from '../../axiosInstance';

export const listLists = async (params: ListQueryType) => {
  return await axiosApiInstance.get('/lists', {
    withCredentials: true,
    params,
  });
};

export const createLists = async (data: CreateListType) => {
  return await axiosApiInstance.post('/lists', data, {
    withCredentials: true,
  });
};

export const findList = async (data: Partial<ListModelType>) => {
  return await axiosApiInstance.get(`/lists/${data.key}`, {
    withCredentials: true,
  });
};
