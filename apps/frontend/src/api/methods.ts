import axiosClient from './axiosClient';
import { HTTPMethod } from './types';
import { SlotsList, EmployeesList, Booking } from './response';
import { AvailableSlotsParams } from './params';
import { CreateBooking } from './payload';

const employeesUrl = 'employees';
const slotsUrl = 'slots';
const bookingUrl = 'booking';

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

export const BookingAPI = {
  createBooking: async (payload: CreateBooking) => {
    const { data } = await axiosClient<Booking>({
      url: bookingUrl,
      method: HTTPMethod.POST,
      data: payload,
    });

    return data;
  },
};
