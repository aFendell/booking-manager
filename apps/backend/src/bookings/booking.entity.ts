import { Employee } from 'src/employees/employee.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'date',
    transformer: {
      to: (value) => value,
      from: (value) => (value ? value.toISOString().split('T')[0] : null),
    },
  })
  date: Date;

  @Column({
    type: 'time',
    transformer: {
      to: (value) => value,
      from: (value) => (value ? value.toTimeString().substring(0, 5) : null),
    },
  })
  time: Date;

  @ManyToOne(() => Employee, (employee) => employee.bookings)
  employee: Employee;
}
