export type CreateEmployeeDto = {
  name: string;
  email: string;
  department: string;
  salary: number;
};

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
