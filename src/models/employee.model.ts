import { BaseModel } from "./base.model";

export type Employee = BaseModel & {
  name: string;
  email: string;
  department: string;
  salary: number;
};

// Employee model type definition
/* Example
    {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",  
      "department": "Engineering",
      "salary": 75000
    }
*/
