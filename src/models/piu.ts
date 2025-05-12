/**
 * Model que representa um piu (tweet) no sistema PiuPiuwer
 *
 * A classe define a estrutura de dados para os pius, incluindo:
 * - Identificação única (id)
 * - Conteúdo (text)
 * - Metadados (userId, datas de criação/atualização)
 * - Estatísticas (likes)
 */
class Piu {
  id: string;
  userId: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  /**
   * Cria uma nova instância de Piu
   * @param id - Identificador único
   * @param userId - ID do usuário criador
   * @param text - Conteúdo do piu
   */
  constructor(id: string, userId: string, text: string) {
    this.id = id;
    this.userId = userId;
    this.text = text;
    this.createdAt = new Date();
    this.updatedAt = new Date(); // Inicialmente igual à data de criação
    this.likes = 0; // Começa sem likes
  }
}

export default Piu;
