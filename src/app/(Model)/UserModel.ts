class UserModel {
  id: string | null;
  name: string;
  username: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  constructor(name: string, username: string, password: string) {
    this.id = null;
    this.name = name;
    this.password = password;
    this.username = username;
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

export default UserModel;
