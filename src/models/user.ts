/**
 * Model que representa um usuário no sistema PiuPiuwer
 *
 * A classe define a estrutura de dados para os usuários, incluindo:
 * - Identificação única (id)
 * - Dados pessoais (name, birth, etc.)
 * - Dados de contato (email, phone)
 * - Perfil (username, about)
 * - Metadados (datas de criação/atualização)
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
  /**
   * Cria uma nova instância de User
   * @param id - Identificador único
   * @param username - Nome de usuário único
   * @param email - Email único
   * @param name - Nome completo
   * @param birth - Data de nascimento
   * @param cpf - CPF único
   * @param phone - Telefone único
   * @param about - Descrição/biografia
   */
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
    this.updatedAt = new Date(); // Inicialmente igual à data de criação
  }
}

export default User;
