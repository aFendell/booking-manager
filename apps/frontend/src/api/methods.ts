import axiosClient from './axiosClient';
import { HTTPMethod } from './types';
import { SlotsList, EmployeesList } from './response';
import { AvailableSlotsParams } from './params';

const employeesUrl = 'employees';
const slotsUrl = 'slots';

export const EmployeesAPI = {
  getEmployees: async () => {
    const { data } = await axiosClient<EmployeesList>({
      url: `/${employeesUrl}`,
      method: HTTPMethod.GET,
    });

    return data;
  },
};

export const SlotsAPI = {
  getSlots: async (params?: AvailableSlotsParams) => {
    const { data } = await axiosClient<SlotsList>({
      url: `/${slotsUrl}`,
      method: HTTPMethod.GET,
      params,
    });

    return data;
  },
};
