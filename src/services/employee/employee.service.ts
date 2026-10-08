import { IEmployeeService } from "@/services/employee/employee.service.interface";
import { IEmployeeRepository } from "@/repositories/employee/employee.repo.interface";
import {
  CreateEmployeeDto,
  EmployeeDto,
  UpdateEmployeeDto,
} from "@/dtos/employee.dto";
import { Employee } from "@/models/employee.model";

export class EmployeeService implements IEmployeeService {
  private readonly _employeeRepository: IEmployeeRepository;

  constructor(private empRepo: IEmployeeRepository) {
    this._employeeRepository = empRepo;
  }

  async getAllEmployees(searchText?: string): Promise<EmployeeDto[]> {
    const availableEmployees =
      await this._employeeRepository.findAll(searchText);

    const results: EmployeeDto[] = [];
    for (let emp of availableEmployees) {
      const res: EmployeeDto = {
        id: emp.id,
        name: emp.name,
        email: emp.email,
        department: emp.department,
        salary: emp.salary,
      };

      results.push(res);
    }

    return results;
  }

  async getEmployeeById(id: number): Promise<EmployeeDto | null> {
    const employee = await this._employeeRepository.findById(id);
    if (!employee) {
      return null;
    }

    const result: EmployeeDto = {
      id: employee.id,
      name: employee.name,
      email: employee.email,
      department: employee.department,
      salary: employee.salary,
    };

    return result;
  }

  async createEmployee(employee: CreateEmployeeDto): Promise<EmployeeDto> {
    const newEmployee: Employee = {
      id: 0,
      ...employee,
      createdAt: new Date(),
      createdBy: "system",
      isActive: true,
      isDeleted: false,
    };
    const createdEmployee = await this._employeeRepository.create(newEmployee);

    const result: EmployeeDto = {
      id: createdEmployee.id,
      name: createdEmployee.name,
      email: createdEmployee.email,
      department: createdEmployee.department,
      salary: createdEmployee.salary,
    };

    return result;
  }

  async updateEmployee(
    id: number,
    employee: UpdateEmployeeDto,
  ): Promise<EmployeeDto | null> {
    // Remove null return when you implement the updateEmployee method
    return null;
  }

  async deleteEmployee(id: number): Promise<boolean> {
    // Remove false return when you implement the deleteEmployee method
    return false;
  }

  async activateEmployee(id: number): Promise<boolean> {
    // Remove false return when you implement the activateEmployee method
    return false;
  }

  async deactivateEmployee(id: number): Promise<boolean> {
    // Remove false return when you implement the deactivateEmployee method
    return false;
  }
}
