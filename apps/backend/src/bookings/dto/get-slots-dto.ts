import { IsDateString, IsOptional, IsUUID } from 'class-validator';

export class GetAvailableSlotsDto {
  @IsDateString()
  date: string;

  @IsOptional()
  @IsUUID()
  employeeId?: string;
}
