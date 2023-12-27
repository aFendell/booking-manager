import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { GetAvailableSlotsDto } from './dto/get-slots-dto';

@Injectable()
export class BookingsRepository extends Repository<Booking> {
  constructor(private dataSource: DataSource) {
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
}
