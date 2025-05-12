// src/repositories/userRepository.ts
import { randomUUID } from 'crypto';

import User from '../models/user';

/**
 * Interface para transferência de dados na criação de usuários
 */
interface ICreateUserDTO {
  username: string;
  email: string;
  name: string;
  birth: Date;
  cpf: string;
  phone: string;
  about: string;
}

/**
 * Interface para transferência de dados na atualização de usuários
 */
interface IUpdateUserDTO {
  id: string;
  data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>;
}

/**
 * Repositório que gerencia operações de CRUD para usuários
 * Implementado com estruturas de dados eficientes (Maps) para
 * garantir alta performance nas operações mais comuns.
 */
class UserRepository {
  /**
   * Armazenamento primário: id -> User
   * Permite acesso direto aos usuários por ID - O(1)
   */
  private users: Map<string, User>;

  /**
   * Índices secundários para busca rápida O(1)
   * Permitem verificar unicidade e buscar por campos específicos
   */
  private emailIndex: Map<string, string>; // email -> userId
  private usernameIndex: Map<string, string>; // username -> userId
  private cpfIndex: Map<string, string>; // cpf -> userId
  private phoneIndex: Map<string, string>; // phone -> userId

  constructor() {
    this.users = new Map<string, User>();
    this.emailIndex = new Map<string, string>();
    this.usernameIndex = new Map<string, string>();
    this.cpfIndex = new Map<string, string>();
    this.phoneIndex = new Map<string, string>();
  }

  /**
   * Cria um novo usuário
   * @param data - Dados do usuário a ser criado
   * @returns Usuário criado
   * @complexity O(1) - Operações em Maps
   */
  public create(data: ICreateUserDTO): User {
    // Gera um ID único usando UUID v4
    const id = randomUUID();

    // Cria a instância do usuário
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

    // Armazena no Map principal
    this.users.set(id, user);

    // Atualiza os índices secundários
    this.emailIndex.set(data.email, id);
    this.usernameIndex.set(data.username, id);
    this.cpfIndex.set(data.cpf, id);
    this.phoneIndex.set(data.phone, id);

    return user;
  }

  /**
   * Retorna todos os usuários
   * @returns Array contendo todos os usuários
   * @complexity O(n) - Onde n é o número total de usuários
   */
  public getAll(): User[] {
    return Array.from(this.users.values());
  }

  /**
   * Busca um usuário por ID
   * @param id - ID do usuário a ser buscado
   * @returns Usuário encontrado ou undefined se não existir
   * @complexity O(1) - Busca direta em Map
   */
  public getById(id: string): User | undefined {
    return this.users.get(id);
  }

  /**
   * Busca rápida por email
   * @param email - Email do usuário
   * @returns Usuário encontrado ou undefined se não existir
   * @complexity O(1) - Busca em índice secundário
   */
  public getByEmail(email: string): User | undefined {
    const id = this.emailIndex.get(email);
    if (!id) return undefined;
    return this.users.get(id);
  }

  /**
   * Verifica se existe usuário com determinado email
   * @param email - Email a verificar
   * @returns Booleano indicando existência
   * @complexity O(1) - Verificação em índice secundário
   */
  public emailExists(email: string): boolean {
    return this.emailIndex.has(email);
  }

  /**
   * Verifica se existe usuário com determinado username
   * @param username - Username a verificar
   * @returns Booleano indicando existência
   * @complexity O(1) - Verificação em índice secundário
   */
  public usernameExists(username: string): boolean {
    return this.usernameIndex.has(username);
  }

  /**
   * Verifica se existe usuário com determinado CPF
   * @param cpf - CPF a verificar
   * @returns Booleano indicando existência
   * @complexity O(1) - Verificação em índice secundário
   */
  public cpfExists(cpf: string): boolean {
    return this.cpfIndex.has(cpf);
  }

  /**
   * Verifica se existe usuário com determinado telefone
   * @param phone - Telefone a verificar
   * @returns Booleano indicando existência
   * @complexity O(1) - Verificação em índice secundário
   */
  public phoneExists(phone: string): boolean {
    return this.phoneIndex.has(phone);
  }

  /**
   * Atualiza um usuário existente
   * @param data - Objeto contendo ID e dados a atualizar
   * @returns Usuário atualizado ou null se não existir
   * @complexity O(1) - Operações em Maps
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

    // Atualiza usuário preservando propriedades existentes
    const updatedUser = {
      ...user,
      ...data.data,
      updatedAt: new Date(), // Atualiza a data de modificação
    };

    // Salva no Map principal
    this.users.set(data.id, updatedUser);

    return updatedUser;
  }

  /**
   * Remove um usuário
   * @param id - ID do usuário a ser removido
   * @returns Booleano indicando sucesso da operação
   * @complexity O(1) - Operações em Maps
   */
  public delete(id: string): boolean {
    const user = this.users.get(id);

    if (!user) return false;

    // Remove índices secundários
    if (user.email) this.emailIndex.delete(user.email);
    if (user.username) this.usernameIndex.delete(user.username);
    if (user.cpf) this.cpfIndex.delete(user.cpf);
    if (user.phone) this.phoneIndex.delete(user.phone);

    // Remove usuário do armazenamento principal
    return this.users.delete(id);
  }
}

export default new UserRepository();
