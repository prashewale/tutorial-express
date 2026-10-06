import { Request, Response } from "express";

export class EmployeeController {
  private readonly _employeeService: IEmployeeService;
  constructor(private empService: IEmployeeService) {
    this._employeeService = empService;
  }

  async getAllEmployees(req: Request, res: Response): Promise<EmployeeDto> {
    const availableEmployees = await this._employeeService.getAllEmployees();

    res.json(availableEmployees);
  }
}
