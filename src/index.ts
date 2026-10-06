import express from "express";
import employeeRouter from "@/routes/employee.routes";

const app = express();
const PORT = 5500;

app.use(express.json()); // Json ==> body

app.use("/api/employees", employeeRouter);

async function startServer() {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
