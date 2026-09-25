import { CreateEmployeeDto, UpdateEmployeeDto } from "@/dtos/employee.dto";
import { Employee } from "@/models/employee.model";

export interface IEmployeeRepository {
  findAll(): Promise<Employee[]>;
  findById(id: number): Promise<Employee | null>;
  create(employee: CreateEmployeeDto): Promise<Employee>;
  update(id: number, employee: UpdateEmployeeDto): Promise<Employee | null>;
  delete(id: number): Promise<boolean>;
}
