
class UserResponse {
  id: string;
  name: string;
  username: string;
  created_at: Date;
  updated_at: Date;

  constructor(user: {
    id: string;
    name: string;
    username: string;
    created_at: Date;
    updated_at: Date;
  }) {
    this.id = user.id;
    this.name = user.name;
    this.username = user.username;
    this.created_at = user.created_at;
    this.updated_at = user.updated_at;
  }
}

export { UserResponse };
