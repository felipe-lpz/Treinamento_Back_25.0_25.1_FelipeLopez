// src/services/piuService.ts
import Piu from '../models/piu';
import piuRepository from '../repositories/piuRepository';
import userRepository from '../repositories/userRepository';

/**
 * Service que implementa as regras de negócio para pius
 */
class PiuService {
  /**
   * Cria um novo piu
   */
  public create(userId: string, text: string): { piu: Piu } | { error: string } {
    // Validar se texto está presente
    if (!text) {
      return { error: 'O texto do piu é obrigatório' };
    }

    // Verificar tamanho máximo (ex: 140 caracteres como no Twitter original)
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
   */
  public listAll(): Piu[] {
    return piuRepository.getAll();
  }

  /**
   * Busca um piu específico pelo ID
   * (Feature bônus - prioridade)
   */
  public findById(id: string): Piu | undefined {
    return piuRepository.getById(id);
  }

  /**
   * Retorna os pius de um usuário específico
   * (Feature bônus)
   */
  public getPiusByUserId(userId: string): Piu[] {
    // Verificar se o usuário existe
    const user = userRepository.getById(userId);
    if (!user) return [];

    return piuRepository.getByUserId(userId);
  }

  /**
   * Remove um piu
   */
  public delete(id: string): boolean {
    return piuRepository.delete(id);
  }

  /**
   * Busca pius por texto
   * (Feature bônus)
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
   * (Feature bônus)
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