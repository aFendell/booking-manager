import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { GetAvailableSlotsDto } from './dto/get-slots-dto';
import { CreateBookingDto } from './dto/create-booking-dto';

@Controller()
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get('slots')
  getAvailableSlots(@Query() availableSlotsDto: GetAvailableSlotsDto) {
    return this.bookingsService.getAvailableSlots(availableSlotsDto);
  }

  @Post('booking')
  createBooking(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.createBooking(createBookingDto);
  }
}
