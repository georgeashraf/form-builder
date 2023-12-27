import { axiosApiInstance } from '../../axiosInstance';
import { CreateFormModelType } from '@engine/shared-types';

export const createForm = async (data: CreateFormModelType) => {
  return await axiosApiInstance.post('/forms', data, {
    withCredentials: true,
  });
};
