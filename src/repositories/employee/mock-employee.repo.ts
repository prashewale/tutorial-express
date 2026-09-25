import { Employee } from "@/models/employee.model";
import { IEmployeeRepository } from "./employee.repo.interface";
import { CreateEmployeeDto, UpdateEmployeeDto } from "@/dtos/employee.dto";

export class MockEmployeeRepository implements IEmployeeRepository {
  private employees: Employee[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      department: "Engineering",
      salary: 75000,
      createdAt: new Date(),
      createdBy: "system",
      isActive: true,
      isDeleted: false,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      department: "Marketing",
      salary: 65000,
      createdAt: new Date(),
      createdBy: "system",
      isActive: true,
      isDeleted: false,
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      department: "Sales",
      salary: 70000,
      createdAt: new Date(),
      createdBy: "system",
      isActive: true,
      isDeleted: false,
    },
  ];

  async findAll(): Promise<Employee[]> {
    return this.employees;
  }

  async findById(id: number): Promise<Employee | null> {
    return this.employees.find((e) => e.id === id) || null;
  }

  async create(employee: CreateEmployeeDto): Promise<Employee> {
    const newEmployee: Employee = {
      id: this.employees.length + 1,
      ...employee,
      createdAt: new Date(),
      createdBy: "system",
      isActive: true,
      isDeleted: false,
    };
    this.employees.push(newEmployee);
    return newEmployee;
  }

  async update(
    id: number,
    employee: UpdateEmployeeDto,
  ): Promise<Employee | null> {
    const availableEmployee = this.employees.find((e) => e.id === id);
    if (!availableEmployee) {
      return null;
    }

    availableEmployee.name = employee.name ?? availableEmployee.name;
    availableEmployee.email = employee.email ?? availableEmployee.email;
    availableEmployee.department =
      employee.department ?? availableEmployee.department;
    availableEmployee.salary = employee.salary ?? availableEmployee.salary;

    availableEmployee.lastModifiedAt = new Date();
    availableEmployee.lastModifiedBy = "system";

    return availableEmployee;
  }

  async delete(id: number): Promise<boolean> {
    const index = this.employees.findIndex((e) => e.id === id);
    if (index === -1) {
      return false;
    }
    this.employees.splice(index, 1);
    return true;
  }
}
