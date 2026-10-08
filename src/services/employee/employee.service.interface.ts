import { CreateEmployeeDto, UpdateEmployeeDto } from "@/dtos/employee.dto";
import { EmployeeDto } from "@/dtos/employee.dto";

export interface IEmployeeService {
  getAllEmployees(searchText?: string): Promise<EmployeeDto[]>;
  getEmployeeById(id: number): Promise<EmployeeDto | null>;
  createEmployee(employee: CreateEmployeeDto): Promise<EmployeeDto>;
  updateEmployee(
    id: number,
    employee: UpdateEmployeeDto,
  ): Promise<EmployeeDto | null>;
  deleteEmployee(id: number): Promise<boolean>;
  activateEmployee(id: number): Promise<boolean>;
  deactivateEmployee(id: number): Promise<boolean>;
}
