import { UserRole } from "@prisma/client";

class UserResponse {
  id: string;
  name: string;
  username: string;
  role: Role;
  created_at: Date;
  updated_at: Date;

  constructor(user: {
    id: string;
    name: string;
    username: string;
    role: Role;
    created_at: Date;
    updated_at: Date;
  }) {
    this.id = user.id;
    this.name = user.name;
    this.username = user.username;
    this.role = user.role;
    this.created_at = user.created_at;
    this.updated_at = user.updated_at;
  }
}

class Role {
  id: number;
  name: UserRole;

  constructor(role: { id: number; name: UserRole }) {
    this.id = role.id;
    this.name = role.name;
  }
}

export { UserResponse, Role };
