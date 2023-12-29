import { IsNotEmpty } from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  time: string;

  @IsNotEmpty()
  employeeId: string;
}
