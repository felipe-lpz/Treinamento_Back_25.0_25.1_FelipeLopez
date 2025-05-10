// src/models/user.ts
/**
 * Model que representa um usuário no sistema PiuPiuwer
 */
class User {
  id: string;
  username: string;
  email: string;
  name: string;
  birth: Date;
  cpf: string;
  phone: string;
  about: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    username: string,
    email: string,
    name: string,
    birth: Date,
    cpf: string,
    phone: string,
    about: string
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.name = name;
    this.birth = birth;
    this.cpf = cpf;
    this.phone = phone;
    this.about = about;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

export default User;