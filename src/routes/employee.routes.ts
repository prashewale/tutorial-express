import { Router } from "express";
import { MockEmployeeRepository } from "@/repositories/employee/mock-employee.repo";
import { EmployeeService } from "@/services/employee/employee.service";
import { EmployeeController } from "@/controllers/employee/employee.controller";
const router = Router();

const repository = new MockEmployeeRepository();

const service = new EmployeeService(repository);

const controller = new EmployeeController(service);

router.get("/", controller.getAllEmployees.bind(controller));

// router.get("/:id", controller.getEmployeeById.bind(controller));

// router.post("/", controller.createEmployee.bind(controller));

// router.put("/:id", controller.updateEmployee.bind(controller));

// router.delete("/:id", controller.deleteEmployee.bind(controller));

// router.put("/:id", controller.activateEmployee.bind(controller));
// router.put("/:id", controller.deactivateEmployee.bind(controller));

export default router;
