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

  async findAll(searchText?: string): Promise<Employee[]> {
    const activeEmployees = this.employees.filter(
      (emp) => emp.isActive && !emp.isDeleted,
    );

    if (searchText) {
      const lowerSearchText = searchText.toLowerCase();

      return activeEmployees.filter(
        (emp) =>
          emp.name.toLowerCase().includes(lowerSearchText) ||
          emp.email.toLowerCase().includes(lowerSearchText) ||
          emp.department.toLowerCase().includes(lowerSearchText),
      );
    }

    return activeEmployees;
  }

  async findById(id: number): Promise<Employee | null> {
    return this.employees.find((e) => e.id === id) || null;
  }

  async create(employee: Employee): Promise<Employee> {
    const newEmployee: Employee = {
      ...employee,
      id: this.employees.length + 1,
    };
    this.employees.push(newEmployee);
    return newEmployee;
  }

  async update(id: number, employee: Employee): Promise<Employee | null> {
    const availableEmployee = this.employees.find((e) => e.id === id);
    if (!availableEmployee) {
      return null;
    }

    availableEmployee.name = employee.name ?? availableEmployee.name;
    availableEmployee.email = employee.email ?? availableEmployee.email;
    availableEmployee.department =
      employee.department ?? availableEmployee.department;
    availableEmployee.salary = employee.salary ?? availableEmployee.salary;

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
