import Piu from '../models/piu';
import piuRepository from '../repositories/piuRepository';
import userRepository from '../repositories/userRepository';

/**
 * Service que implementa as regras de negócio para pius
 */
class PiuService {
  /**
   * Cria um novo piu
   * @param userId - ID do usuário que está criando o piu
   * @param text - Texto do piu
   * @returns Objeto contendo o piu criado ou mensagem de erro
   * @complexity O(1) - Operações em Maps
   */
  public create(userId: string, text: string): { piu: Piu } | { error: string } {
    // Validar se texto está presente
    if (!text) {
      return { error: 'O texto do piu é obrigatório' };
    }

    // Verificar tamanho máximo (140 caracteres como no Twitter original)
    if (text.length > 140) {
      return { error: 'O piu não pode ter mais de 140 caracteres' };
    }

    // Verificar se o usuário existe
    const user = userRepository.getById(userId);
    if (!user) {
      return { error: 'Usuário não encontrado' };
    }

    // Criar piu
    const piu = piuRepository.create({
      userId,
      text,
    });

    return { piu };
  }

  /**
   * Lista todos os pius
   * @returns Array com todos os pius
   * @complexity O(n) - Onde n é o número total de pius
   */
  public listAll(): Piu[] {
    return piuRepository.getAll();
  }

  /**
   * Busca um piu específico pelo ID
   * @param id - ID do piu a ser buscado
   * @returns Piu encontrado ou undefined se não existir
   * @complexity O(1) - Busca direta em Map
   */
  public findById(id: string): Piu | undefined {
    return piuRepository.getById(id);
  }

  /**
   * Retorna os pius de um usuário específico
   * @param userId - ID do usuário
   * @returns Array com os pius do usuário
   * @complexity O(m) - Onde m é o número de pius do usuário
   */
  public getPiusByUserId(userId: string): Piu[] {
    // Verificar se o usuário existe
    const user = userRepository.getById(userId);
    if (!user) return [];

    return piuRepository.getByUserId(userId);
  }

  /**
   * Remove um piu
   * @param id - ID do piu a ser removido
   * @returns Booleano indicando sucesso da operação
   * @complexity O(1) - Operação de remoção em Map
   */
  public delete(id: string): boolean {
    return piuRepository.delete(id);
  }

  /**
   * Busca pius por texto
   * @param query - Texto a ser buscado
   * @returns Array com pius que contenham o texto buscado
   * @complexity O(n) - Onde n é o número total de pius (percorre todos para filtrar)
   */
  public searchPius(query: string): Piu[] {
    const allPius = piuRepository.getAll();
    
    // Busca case insensitive
    const lowercaseQuery = query.toLowerCase();
    
    return allPius.filter(piu => 
      piu.text.toLowerCase().includes(lowercaseQuery)
    );
  }

  /**
   * Retorna N pius aleatórios (trending)
   * @param count - Quantidade de pius a retornar
   * @returns Array com pius aleatórios
   * @complexity O(n) - Onde n é o número total de pius (para o embaralhamento)
   */
  public getRandomPius(count: number): Piu[] {
    const allPius = piuRepository.getAll();
    
    // Se houver menos pius que o solicitado, retorna todos
    if (allPius.length <= count) {
      return allPius;
    }
    
    // Embaralha o array usando o algoritmo de Fisher-Yates (eficiente)
    const shuffled = [...allPius];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // Retorna os primeiros N elementos
    return shuffled.slice(0, count);
  }
}

export default new PiuService();