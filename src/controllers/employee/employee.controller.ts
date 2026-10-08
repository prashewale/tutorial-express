import { CreateEmployeeDto, EmployeeDto } from "@/dtos/employee.dto";
import { IEmployeeService } from "@/services/employee/employee.service.interface";
import { Request, Response } from "express";

export class EmployeeController {
  private readonly _employeeService: IEmployeeService;
  constructor(private empService: IEmployeeService) {
    this._employeeService = empService;
  }

  async getAllEmployees(req: Request, res: Response): Promise<void> {
    const searchText = req.query.search as string | undefined;

    const availableEmployees =
      await this._employeeService.getAllEmployees(searchText);
    res.json(availableEmployees);
  }

  async getEmployeeById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id.toString(), 10);
    const employee = await this._employeeService.getEmployeeById(id);
    if (!employee) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }
    res.json(employee);
  }

  async createEmployee(req: Request, res: Response): Promise<void> {
    const employeeData = req.body as CreateEmployeeDto;

    if (!employeeData) {
      res.status(400).json({ message: "Request body is missing" });
      return;
    }

    if (
      !employeeData.name ||
      !employeeData.email ||
      !employeeData.department ||
      !employeeData.salary
    ) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const newEmployee =
      await this._employeeService.createEmployee(employeeData);
    res.status(201).json(newEmployee);
  }
}
