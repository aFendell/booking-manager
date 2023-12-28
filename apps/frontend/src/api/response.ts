type Employee = {
  id: string;
  name: string;
};

export type EmployeesList = Employee[];

type Slot = string;

type SlotList = Slot[];

type EmployeeAvailableSlots = {
  employeeId: string;
  availableSlots: SlotList;
};

export type AvailableSlots = EmployeeAvailableSlots[];
