import { z } from "zod";

export const createEmployeeSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name must be at most 100 characters long")
    .regex(/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces"),

  email: z.email().max(254, "Email must be at most 254 characters long"),

  department: z
    .string()
    .trim()
    .min(2, "Department must be at least 2 characters long")
    .max(100, "Department must be at most 100 characters long"),

  salary: z.number().min(0, "Salary must be a non-negative number"),

  age: z
    .number()
    .int()
    .positive()
    .min(18, "Age must be at least 18")
    .max(65, "Age must be at most 65")
    .optional(),
});
