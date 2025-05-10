// src/repositories/userRepository.ts
import { randomUUID } from 'crypto';
import User from '../models/user';

// Interfaces para transferência de dados
interface ICreateUserDTO {
  username: string;
  email: string;
  name: string;
  birth: Date;
  cpf: string;
  phone: string;
  about: string;
}

interface IUpdateUserDTO {
  id: string;
  data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>;
}

/**
 * Repositório que gerencia operações de CRUD para usuários
 * Implementado com Maps para garantir performance O(1)
 */
class UserRepository {
  // Armazenamento primário: id -> User
  private users: Map<string, User>;
  
  // Índices secundários para busca rápida O(1)
  private emailIndex: Map<string, string>;
  private usernameIndex: Map<string, string>;
  private cpfIndex: Map<string, string>;
  private phoneIndex: Map<string, string>;

  constructor() {
    this.users = new Map<string, User>();
    this.emailIndex = new Map<string, string>();
    this.usernameIndex = new Map<string, string>();
    this.cpfIndex = new Map<string, string>();
    this.phoneIndex = new Map<string, string>();
  }

  /**
   * Cria um novo usuário
   * Complexidade: O(1)
   */
  public create(data: ICreateUserDTO): User {
    const id = randomUUID();
    
    const user = new User(
      id,
      data.username,
      data.email,
      data.name,
      data.birth,
      data.cpf,
      data.phone,
      data.about
    );
    
    this.users.set(id, user);
    this.emailIndex.set(data.email, id);
    this.usernameIndex.set(data.username, id);
    this.cpfIndex.set(data.cpf, id);
    this.phoneIndex.set(data.phone, id);
    
    return user;
  }

  /**
   * Retorna todos os usuários
   * Complexidade: O(n)
   */
  public getAll(): User[] {
    return Array.from(this.users.values());
  }

  /**
   * Busca um usuário por ID
   * Complexidade: O(1)
   */
  public getById(id: string): User | undefined {
    return this.users.get(id);
  }

  /**
   * Busca rápida por email - O(1)
   */
  public getByEmail(email: string): User | undefined {
    const id = this.emailIndex.get(email);
    if (!id) return undefined;
    return this.users.get(id);
  }

  /**
   * Verifica se existe usuário com determinado email
   * Complexidade: O(1)
   */
  public emailExists(email: string): boolean {
    return this.emailIndex.has(email);
  }

  /**
   * Verifica se existe usuário com determinado username
   * Complexidade: O(1)
   */
  public usernameExists(username: string): boolean {
    return this.usernameIndex.has(username);
  }

  /**
   * Verifica se existe usuário com determinado CPF
   * Complexidade: O(1)
   */
  public cpfExists(cpf: string): boolean {
    return this.cpfIndex.has(cpf);
  }

  /**
   * Verifica se existe usuário com determinado telefone
   * Complexidade: O(1)
   */
  public phoneExists(phone: string): boolean {
    return this.phoneIndex.has(phone);
  }

  /**
   * Atualiza um usuário existente
   * Complexidade: O(1)
   */
  public update(data: IUpdateUserDTO): User | null {
    const user = this.users.get(data.id);
    
    if (!user) return null;
    
    // Atualiza índices secundários se necessário
    if (data.data.email && data.data.email !== user.email) {
      this.emailIndex.delete(user.email);
      this.emailIndex.set(data.data.email, data.id);
    }
    
    if (data.data.username && data.data.username !== user.username) {
      this.usernameIndex.delete(user.username);
      this.usernameIndex.set(data.data.username, data.id);
    }
    
    if (data.data.cpf && data.data.cpf !== user.cpf) {
      this.cpfIndex.delete(user.cpf);
      this.cpfIndex.set(data.data.cpf, data.id);
    }
    
    if (data.data.phone && data.data.phone !== user.phone) {
      this.phoneIndex.delete(user.phone);
      this.phoneIndex.set(data.data.phone, data.id);
    }
    
    // Atualiza usuário
    const updatedUser = {
      ...user,
      ...data.data,
      updatedAt: new Date()
    };
    
    this.users.set(data.id, updatedUser);
    
    return updatedUser;
  }

  /**
   * Remove um usuário
   * Complexidade: O(1)
   */
 public delete(id: string): boolean {
  const user = this.users.get(id);
  
  if (!user) return false;
  
  // Remover dos índices secundários
  this.emailIndex.delete(user.email);
  this.usernameIndex.delete(user.username);
  this.cpfIndex.delete(user.cpf);
  this.phoneIndex.delete(user.phone);
  
  // Remover o usuário do mapa principal
  const result = this.users.delete(id);
  
  // Verificar se a remoção foi bem-sucedida
  
  return result;
}
}

export default new UserRepository();