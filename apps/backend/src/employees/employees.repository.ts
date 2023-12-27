import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Employee } from './employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class EmployeesRepository extends Repository<Employee> {
  constructor(private dataSource: DataSource) {
    super(Employee, dataSource.createEntityManager());
  }

  async createEmployee(createEmployeeDto: CreateEmployeeDto) {
    const { name } = createEmployeeDto;

    const employee = this.create({
      name,
    });

    await this.save(employee);

    return employee;
  }
}
