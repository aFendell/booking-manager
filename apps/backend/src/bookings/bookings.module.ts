import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { BookingsRepository } from './bookings.repository';
import { EmployeesModule } from 'src/employees/employees.module';

@Module({
  imports: [TypeOrmModule.forFeature([Booking]), EmployeesModule],
  providers: [BookingsService, BookingsRepository],
  controllers: [BookingsController],
})
export class BookingsModule {}
