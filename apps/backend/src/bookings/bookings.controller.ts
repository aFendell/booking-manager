import { Controller, Get, Query } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { GetAvailableSlotsDto } from './dto/get-slots-dto';

@Controller()
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get('slots')
  getAvailableSlots(@Query() availableSlotsDto: GetAvailableSlotsDto) {
    return this.bookingsService.getAvailableSlots(availableSlotsDto);
  }
}
