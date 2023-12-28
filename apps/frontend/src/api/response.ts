type Employee = {
  id: string;
  name: string;
};

export type EmployeesList = Employee[];

type SlotsItem = {
  employeeId: string;
  availableSlots: string[];
};

export type SlotsList = SlotsItem[];

export type Booking = {
  id: string;
  date: Date;
  time: Date;
  employee: Employee;
};
