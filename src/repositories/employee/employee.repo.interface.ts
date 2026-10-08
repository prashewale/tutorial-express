import { CreateEmployeeDto, UpdateEmployeeDto } from "@/dtos/employee.dto";
import { Employee } from "@/models/employee.model";

export interface IEmployeeRepository {
  findAll(searchText?: string): Promise<Employee[]>;
  findById(id: number): Promise<Employee | null>;
  create(employee: Employee): Promise<Employee>;
  update(id: number, employee: Employee): Promise<Employee | null>;
  delete(id: number): Promise<boolean>;
}
