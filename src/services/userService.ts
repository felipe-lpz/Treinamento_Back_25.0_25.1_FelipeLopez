// src/services/userService.ts
import { randomUUID } from 'crypto';
import User from '../models/user';
import userRepository from '../repositories/userRepository';
import piuRepository from '../repositories/piuRepository';

/**
 * Service que implementa as regras de negócio para usuários
 */
class UserService {
  /**
   * Cria um novo usuário com validações
   */
  public create(
    username: string,
    email: string,
    name: string,
    birth: Date,
    cpf: string,
    phone: string,
    about: string
  ): { user: User } | { error: string } {
    // Validações
    if (!username || !email || !name || !birth || !cpf || !phone) {
      return { error: 'Todos os campos são obrigatórios' };
    }

    // Verificar se já existe usuário com este email
    if (userRepository.emailExists(email)) {
      return { error: 'Este email já está em uso' };
    }

    // Verificar se já existe usuário com este username
    if (userRepository.usernameExists(username)) {
      return { error: 'Este username já está em uso' };
    }

    // Verificar se já existe usuário com este CPF
    if (userRepository.cpfExists(cpf)) {
      return { error: 'Este CPF já está cadastrado' };
    }

    // Verificar se já existe usuário com este telefone
    if (userRepository.phoneExists(phone)) {
      return { error: 'Este telefone já está cadastrado' };
    }

    // Criar usuário
    const user = userRepository.create({
      username,
      email,
      name,
      birth,
      cpf,
      phone,
      about,
    });

    return { user };
  }

  /**
   * Lista todos os usuários
   */
  public listAll(): User[] {
    return userRepository.getAll();
  }

  /**
   * Busca um usuário pelo ID
   */
  public findById(id: string): User | undefined {
    return userRepository.getById(id);
  }

  /**
   * Atualiza os dados de um usuário
   */
  public update(
    id: string,
    data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>
  ): { user: User } | { error: string } {
    // Verificar se usuário existe
    const existingUser = userRepository.getById(id);
    if (!existingUser) {
      return { error: 'Usuário não encontrado' };
    }

    // Validar campos únicos
    if (data.email && data.email !== existingUser.email) {
      if (userRepository.emailExists(data.email)) {
        return { error: 'Este email já está em uso' };
      }
    }

    if (data.username && data.username !== existingUser.username) {
      if (userRepository.usernameExists(data.username)) {
        return { error: 'Este username já está em uso' };
      }
    }

    if (data.cpf && data.cpf !== existingUser.cpf) {
      if (userRepository.cpfExists(data.cpf)) {
        return { error: 'Este CPF já está cadastrado' };
      }
    }

    if (data.phone && data.phone !== existingUser.phone) {
      if (userRepository.phoneExists(data.phone)) {
        return { error: 'Este telefone já está cadastrado' };
      }
    }

    // Atualizar usuário
    const updatedUser = userRepository.update({
      id,
      data,
    });

    if (!updatedUser) {
      return { error: 'Erro ao atualizar usuário' };
    }

    return { user: updatedUser };
  }

  /**
   * Remove um usuário
   */
  public delete(id: string): boolean {
    // Verificar se o usuário existe
    const existingUser = userRepository.getById(id);
    if (!existingUser) return false;

    // Deletar o usuário
    return userRepository.delete(id);
  }
}

export default new UserService();