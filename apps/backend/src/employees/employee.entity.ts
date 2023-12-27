import { Booking } from 'src/bookings/booking.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Booking, (booking) => booking.employee, { eager: false })
  bookings: Booking[];
}
