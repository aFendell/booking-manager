import { Inject, Injectable } from '@nestjs/common';
import { generateTimeSlots } from './bookings.utils';
import { GetAvailableSlotsDto } from './dto/get-slots-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingsRepository } from './bookings.repository';
import { EmployeesService } from 'src/employees/employees.service';
import { Booking } from './booking.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(BookingsRepository)
    private bookingsRepository: BookingsRepository,
    @Inject(EmployeesService) private employeesService: EmployeesService,
  ) {}

  async getAvailableSlots(availableSlotsDto: GetAvailableSlotsDto) {
    const { date, employeeId } = availableSlotsDto;

    const slotsOptions = generateTimeSlots(date);

    if (employeeId) {
      const bookings = await this.bookingsRepository.getBookings({
        date,
        employeeId,
      });

      const availableSlots = this.getEmployeeAvailableSlots(
        bookings,
        slotsOptions,
      );

      return [{ employeeId, availableSlots }];
    } else {
      const employees = await this.employeesService.getAllEmployees();
      const bookings = await this.bookingsRepository.getBookings({ date });

      const results = employees.map((employee) => {
        const employeeBookings = bookings.filter(
          (booking) => booking.employee.id === employee.id,
        );

        const availableSlots = this.getEmployeeAvailableSlots(
          employeeBookings,
          slotsOptions,
        );

        return { employeeId: employee.id, availableSlots };
      });

      return results;
    }
  }

  getEmployeeAvailableSlots(bookings: Booking[], slotsOptions: string[]) {
    const bookedSlots = bookings.map((booking) => booking.time.toTimeString());

    const availableSlots = slotsOptions.filter(
      (slot) => !bookedSlots.includes(slot),
    );

    return availableSlots;
  }
}
