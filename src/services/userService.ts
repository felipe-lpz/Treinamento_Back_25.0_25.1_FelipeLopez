import User from '../models/user';
import piuRepository from '../repositories/piuRepository';
import userRepository from '../repositories/userRepository';
import {
  validateCPF,
  validatePhone,
  formatCPF,
  formatPhone,
} from '../utils/validation';

/**
 * Service que implementa as regras de negócio para usuários
 * Inclui validações de formato para CPF e telefone
 */
class UserService {
  /**
   * Cria um novo usuário com validações
   * @param username - Nome de usuário único
   * @param email - Email único
   * @param name - Nome completo
   * @param birth - Data de nascimento
   * @param cpf - CPF único
   * @param phone - Telefone único
   * @param about - Descrição do usuário
   * @returns Objeto contendo o usuário criado ou mensagem de erro
   * @complexity O(1) - Todas as validações e operações usam Maps
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

    // Validar formato do CPF
    if (!validateCPF(cpf)) {
      return { error: 'O CPF informado não é válido' };
    }

    // Formatar CPF e telefone
    const formattedCPF = formatCPF(cpf);
    const formattedPhone = phone.match(/^\(\d{2}\)\s\d{5}-\d{4}$/)
      ? phone
      : formatPhone(phone);

    // Validar formato do telefone após formatação
    if (!validatePhone(formattedPhone)) {
      return { error: 'O telefone deve estar no formato (XX) XXXXX-XXXX' };
    }

    // Verificar se já existe usuário com este CPF
    if (userRepository.cpfExists(formattedCPF)) {
      return { error: 'Este CPF já está cadastrado' };
    }

    // Verificar se já existe usuário com este telefone
    if (userRepository.phoneExists(formattedPhone)) {
      return { error: 'Este telefone já está cadastrado' };
    }

    // Criar usuário com dados formatados
    const user = userRepository.create({
      username,
      email,
      name,
      birth,
      cpf: formattedCPF,
      phone: formattedPhone,
      about,
    });

    return { user };
  }

  /**
   * Lista todos os usuários
   * @returns Array com todos os usuários
   * @complexity O(n) - Onde n é o número total de usuários
   */
  public listAll(): User[] {
    return userRepository.getAll();
  }

  /**
   * Busca um usuário pelo ID
   * @param id - ID do usuário
   * @returns Usuário encontrado ou undefined se não existir
   * @complexity O(1) - Busca direta em Map
   */
  public findById(id: string): User | undefined {
    return userRepository.getById(id);
  }

  /**
   * Atualiza os dados de um usuário
   * @param id - ID do usuário a ser atualizado
   * @param data - Campos a serem atualizados
   * @returns Objeto contendo o usuário atualizado ou mensagem de erro
   * @complexity O(1) - Todas as validações e operações usam Maps
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
      // Validar formato do CPF
      if (!validateCPF(data.cpf)) {
        return { error: 'O CPF informado não é válido' };
      }

      // Formatar CPF
      const formattedCPF = formatCPF(data.cpf);

      if (userRepository.cpfExists(formattedCPF)) {
        return { error: 'Este CPF já está cadastrado' };
      }

      // Atualizar para o formato correto
      data.cpf = formattedCPF;
    }

    if (data.phone && data.phone !== existingUser.phone) {
      // Formatar telefone se necessário
      const formattedPhone = data.phone.match(/^\(\d{2}\)\s\d{5}-\d{4}$/)
        ? data.phone
        : formatPhone(data.phone);

      // Validar formato do telefone após formatação
      if (!validatePhone(formattedPhone)) {
        return { error: 'O telefone deve estar no formato (XX) XXXXX-XXXX' };
      }

      if (userRepository.phoneExists(formattedPhone)) {
        return { error: 'Este telefone já está cadastrado' };
      }

      // Atualizar para o formato correto
      data.phone = formattedPhone;
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
   * Remove um usuário e todos os seus pius (deleção em cascata)
   * @param id - ID do usuário a ser removido
   * @returns Booleano indicando sucesso da operação
   * @complexity O(n) - Onde n é o número de pius do usuário
   */
  public delete(id: string): boolean {
    // Verificar se o usuário existe
    const existingUser = userRepository.getById(id);
    if (!existingUser) return false;

    // Obter todos os pius do usuário
    const userPius = piuRepository.getByUserId(id);

    // Deletar todos os pius do usuário
    userPius.forEach(piu => {
      piuRepository.delete(piu.id);
    });

    // Deletar o usuário
    return userRepository.delete(id);
  }
}

export default new UserService();
