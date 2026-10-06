import { IEmployeeService } from "@/services/employee/employee.service.interface";
import { Employee } from "@/models/employee.model";
import { IEmployeeRepository } from "@/repositories/employee/employee.repo.interface";

export class EmployeeService implements IEmployeeService {
  private readonly _employeeRepository: IEmployeeRepository;
  constructor(private empRepo: IEmployeeRepository) {
    this._employeeRepository = empRepo;
  }

  async getAllEmployees(): Promise<EmployeeDto[]> {
    const availableEmployees = await this._employeeRepository.findAll();

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
}
