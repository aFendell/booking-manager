import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { GetAvailableSlotsDto } from './dto/get-slots-dto';
import { CreateBookingDto } from './dto/create-booking-dto';
import { EmployeesService } from 'src/employees/employees.service';

@Injectable()
export class BookingsRepository extends Repository<Booking> {
  constructor(
    private dataSource: DataSource,
    @Inject(EmployeesService) private employeesService: EmployeesService,
  ) {
    super(Booking, dataSource.createEntityManager());
  }

  async getBookings(availableSlotsDto: GetAvailableSlotsDto) {
    const { date, employeeId } = availableSlotsDto;

    const query = this.createQueryBuilder('booking');

    query.where('booking.date = :date', { date });

    if (employeeId) {
      query.andWhere('booking.employee.id = :employeeId', { employeeId });
    }

    const bookings = await query.getMany();

    return bookings;
  }

  async createBooking(createBookingDto: CreateBookingDto) {
    const { employeeId, date, time } = createBookingDto;

    const employee = await this.employeesService.getEmployeeById(employeeId);

    const booking = this.create({
      employee,
      date,
      time,
    });

    await this.save(booking);

    return booking;
  }
}
