import axiosClient from './axiosClient';
import { HTTPMethod } from './types';
import { AvailableSlots, EmployeesList } from './response';
import { SlotsParams } from './params';

const employeesUrl = 'employees';
const slotsUrl = '/slots';

export const EmployeesAPI = {
  getAllEmployees: async () => {
    const { data } = await axiosClient<EmployeesList>({
      url: `/${employeesUrl}`,
      method: HTTPMethod.GET,
    });

    return data;
  },
};

export const SlotsAPI = {
  getAvailableSlots: async (params: SlotsParams) => {
    const { data } = await axiosClient<AvailableSlots>({
      url: `/${slotsUrl}`,
      method: HTTPMethod.GET,
      params,
    });

    return data;
  },
};
