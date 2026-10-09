import { CreateEmployeeDto, EmployeeDto } from "@/dtos/employee.dto";
import { IEmployeeService } from "@/services/employee/employee.service.interface";
import { createEmployeeSchema } from "@/validators/employee.schema";
import { Request, Response } from "express";
import z from "zod";

export class EmployeeController {
  private readonly _employeeService: IEmployeeService;
  constructor(private empService: IEmployeeService) {
    this._employeeService = empService;
  }

  async getAllEmployees(req: Request, res: Response): Promise<void> {
    const searchText = req.query.search as string | undefined;

    const availableEmployees =
      await this._employeeService.getAllEmployees(searchText);

    const apiResponse = {
      status: "SUCCESS",
      message: "Employees retrieved successfully",
      data: availableEmployees,
    };

    res.json(apiResponse);
  }

  async getEmployeeById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id.toString(), 10);

    if (isNaN(id)) {
      const apiResponse = {
        status: "FAILURE",
        message: "Invalid employee ID",
      };
      res.status(400).json(apiResponse);
      return;
    }

    const employee = await this._employeeService.getEmployeeById(id);
    if (!employee) {
      const apiResponse = {
        status: "FAILURE",
        message: "Employee not found",
      };

      res.status(404).json(apiResponse);
      return;
    }

    const apiResponse = {
      status: "SUCCESS",
      message: "Employee retrieved successfully",
      data: employee,
    };

    res.json(apiResponse);
  }

  async createEmployee(req: Request, res: Response): Promise<void> {
    const employeeData = req.body as CreateEmployeeDto;

    // try {
    //   createEmployeeSchema.parse(employeeData);
    // } catch (error) {
    //   res.status(400).json({
    //     message: "Invalid employee data",
    //     errors: (error as z.ZodError).flatten(),
    //   });
    //   return;
    // }

    const result = createEmployeeSchema.safeParse(employeeData);

    if (!result.success) {
      const apiResponse = {
        status: "FAILURE",
        message: "Invalid employee data",
        errors: result.error.flatten(),
      };
      res.status(400).json(apiResponse);
      return;
    }

    const newEmployee =
      await this._employeeService.createEmployee(employeeData);

    const apiResponse = {
      status: "SUCCESS",
      message: "Employee created successfully",
      data: newEmployee,
    };
    res.status(201).json(apiResponse);
  }
}
