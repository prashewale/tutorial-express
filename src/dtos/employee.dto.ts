// export type CreateEmployeeDto = {
//   name: string;
//   email: string;
//   department: string;
//   salary: number;
//   age?: number;
// };

import { createEmployeeSchema } from "@/validators/employee.schema";
import z from "zod";

export type CreateEmployeeDto = z.infer<typeof createEmployeeSchema>;

export type UpdateEmployeeDto = {
  name?: string;
  email?: string;
  department?: string;
  salary?: number;
};

export type EmployeeDto = {
  id: number;
  name: string;
  email: string;
  department: string;
  salary: number;
};
