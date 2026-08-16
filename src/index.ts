import express, { NextFunction, Request, Response } from "express";
import { User, Gender } from "./models/user";

const app = express();

app.use(express.json()); // Json ==> body

const PORT = 5500;

let users: User[] = [];

app.get("/users", (req: Request, res: Response) => {
  const gender = req.query.gender;
  const name: string | undefined = req.query.name?.toString().toLowerCase();

  let filteredUsers: User[] = users;

  if (gender) {
    filteredUsers = users.filter((x) => x.gender == gender);
  }

  if (name) {
    filteredUsers = users.filter((x) => x.name.toLowerCase().includes(name));
  }

  res.json(filteredUsers);
});

function validateUserMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const body = req.body;

  if (!body.name) {
    res.status(400).send("Name is required");
    return;
  }

  if (!/^[A-Za-z.\s]{2,40}$/i.test(body.name)) {
    res.status(400).send("Name should be valid with 2 to 40 chars");
    return;
  }

  if (!body.age) {
    res.status(400).send("Age is required");
    return;
  }

  if (body.age < 12 || body.age > 80) {
    res.status(400).send("Age can be between 12 to 80 years only.");
    return;
  }

  if (!body.gender) {
    res.status(400).send("Gender is required");
    return;
  }

  if (body.gender != "M" && body.gender != "F" && body.gender != "O") {
    res.status(400).send("Gender can be 'M', 'F' OR 'O'");
    return;
  }

  next();
}

app.post("/users", validateUserMiddleware, (req: Request, res: Response) => {
  const body = req.body;
  const lastUser = users.length > 0 ? users[users.length - 1] : undefined;

  let lastUserId = 0;
  if (lastUser) {
    lastUserId = lastUser.id;
  }

  const newUserId = lastUserId + 1;

  const user = new User(newUserId, body.name, body.age, body.gender);
  users.push(user);

  res.json(user);
});

// CRUD - Create (POST) / Read (GET) / Update (PUT) / Delete (DELETE)

app.put("/users/:id", validateUserMiddleware, (req: Request, res: Response) => {
  const body = req.body;
  const id = req.params.id;

  if (!id) {
    res.status(400).send("User id is required");
    return;
  }

  const availableUser = users.find((x) => x.id.toString() == id);
  if (!availableUser) {
    res.status(404).send("User not found!");
    return;
  }

  availableUser.age = body.age;
  availableUser.gender = body.gender;
  availableUser.name = body.name;

  res.json(availableUser);
});

app.delete("/users/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).send("User id is required");
    return;
  }

  const availableUser = users.find((x) => x.id.toString() == id);
  if (!availableUser) {
    res.status(404).send("User not found!");
    return;
  }

  users = users.filter((x) => x.id != availableUser.id);

  res.json(availableUser);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
