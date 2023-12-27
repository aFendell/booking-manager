import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeesRepository } from './employees.repository';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(EmployeesRepository)
    private employeesRepository: EmployeesRepository,
  ) {}
  createEmployee(createEmployeeDto: CreateEmployeeDto) {
    return this.employeesRepository.createEmployee(createEmployeeDto);
  }

  async getEmployees() {
    const employees = await this.employeesRepository.find();
    return employees;
  }

  async getEmployeeById(id: string) {
    const employee = await this.employeesRepository.findOne({ where: { id } });

    if (!employee) {
      return new NotFoundException(`Employee with ID '${id}' was not found`);
    }

    return employee;
  }
}
