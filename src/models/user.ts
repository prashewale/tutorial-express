export type Gender = "M" | "F" | "O";

export class User {
  readonly id: number;
  name: string;
  age: number;
  gender: Gender;

  constructor(id: number, name: string, age: number, gender: Gender) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
}

// export default User;
