import { useMutation, useQuery } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { BookingAPI, EmployeesAPI, SlotsAPI } from 'api/methods';
import { AvailableSlotsParams } from 'api/params';
import { EmployeesList, SlotsList } from 'api/response';

import { getNewDate } from 'utils/dates.utils';
import { FormProvider } from 'components/forms/Form';
import SelectField, { SelectItemProps } from 'components/forms/SelectField';
import DatePickerField from 'components/forms/DatePickerField';
import { Button } from 'components/ui/Button';
import { CreateBooking } from 'api/payload';

const FormSchema = z.object({
  employeeId: z.string().uuid(),
  date: z.date(),
  time: z.string(),
});

const BookingForm = () => {
  const form = useForm<CreateBooking>({
    resolver: zodResolver(FormSchema),
  });

  const {
    data: employeesList,
    isLoading: isEmployeesLoading,
    isError: isEmployeesError,
  } = useQuery({
    queryKey: ['getEmployees'],
    queryFn: EmployeesAPI.getEmployees,
  });

  const getEmployeesOptions = (employees: EmployeesList) => {
    const options: SelectItemProps[] = employees.map((employee) => ({
      value: employee.id,
      label: employee.name,
    }));

    return options;
  };

  const availableSlotsParams: AvailableSlotsParams = {
    employeeId: form.watch('employeeId'),
    date: getNewDate(),
  };

  const {
    data: slotsList,
    isLoading: isSlotsLoading,
    isError: isSlotsError,
  } = useQuery({
    queryKey: ['getAvailableSlots', availableSlotsParams],
    queryFn: () => SlotsAPI.getSlots(availableSlotsParams),
  });

  const getUniqueSlots = (slotsList: SlotsList) => {
    const uniqueSlotsSet = new Set<string>();

    slotsList.forEach((slotsItem) => {
      slotsItem.availableSlots.forEach((slot) => {
        uniqueSlotsSet.add(slot);
      });
    });

    const options: SelectItemProps[] = Array.from(uniqueSlotsSet).map(
      (slot) => ({
        value: slot,
        label: slot,
      }),
    );

    return options;
  };

  const { mutate: createBooking } = useMutation({
    mutationKey: ['createBooking'],
    mutationFn: (data: CreateBooking) => BookingAPI.createBooking(data),
    onSuccess: (data) => {
      console.log('created', data);
    },
    onError: (error) => {
      console.log('error', error?.message);
    },
  });

  const onSubmit = (values: CreateBooking) => {
    console.log('create booking:', values);
    createBooking(values);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex gap-2'>
        <SelectField
          items={employeesList ? getEmployeesOptions(employeesList) : []}
          name='employeeId'
          control={form.control}
          withIcon={false}
          placeholder='Employee'
          disabled={isEmployeesError || isEmployeesLoading}
        />
        <DatePickerField name='date' control={form.control} />
        <SelectField
          items={slotsList ? getUniqueSlots(slotsList) : []}
          name='time'
          control={form.control}
          withIcon={false}
          placeholder='Pick a time'
          disabled={isSlotsError || isSlotsLoading}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </FormProvider>
  );
};

export default BookingForm;
