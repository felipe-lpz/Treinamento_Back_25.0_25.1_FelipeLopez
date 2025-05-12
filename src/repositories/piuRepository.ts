import { randomUUID } from 'crypto';

import Piu from '../models/piu';

/**
 * Interface para transferência de dados na criação de pius
 */
interface ICreatePiuDTO {
  userId: string;
  text: string;
}

/**
 * Repositório que gerencia operações de CRUD para pius
 * Implementado com estruturas de dados eficientes (Maps e Sets) para
 * garantir alta performance nas operações mais comuns.
 */
class PiuRepository {
  /**
   * Armazenamento primário: id -> Piu
   * Permite acesso direto aos pius por ID - O(1)
   */
  private pius: Map<string, Piu>;

  /**
   * Índice secundário: userId -> Set de piuIds
   * Permite recuperar rapidamente todos os pius de um usuário - O(1)
   */
  private userPiusIndex: Map<string, Set<string>>;

  constructor() {
    this.pius = new Map<string, Piu>();
    this.userPiusIndex = new Map<string, Set<string>>();
  }

  /**
   * Cria um novo piu
   * @param data - Dados do piu a ser criado
   * @returns Piu criado
   * @complexity O(1) - Operações em Map e Set
   */
  public create(data: ICreatePiuDTO): Piu {
    const id = randomUUID();
    const piu = new Piu(id, data.userId, data.text);
    this.pius.set(id, piu);

    // Adiciona ao índice de pius por usuário
    if (!this.userPiusIndex.has(data.userId)) {
      this.userPiusIndex.set(data.userId, new Set<string>());
    }

    this.userPiusIndex.get(data.userId)?.add(id);

    return piu;
  }
  /**
   * Retorna todos os pius
   * @returns Array contendo todos os pius
   * @complexity O(n) - Onde n é o número total de pius
   */
  public getAll(): Piu[] {
    return Array.from(this.pius.values());
  }
  /**
   * Busca um piu pelo ID
   * @param id - ID do piu a ser buscado
   * @returns Piu encontrado ou undefined se não existir
   * @complexity O(1) - Busca direta em Map
   */
  public getById(id: string): Piu | undefined {
    return this.pius.get(id);
  }
  /**
   * Busca pius de um usuário específico
   * @param userId - ID do usuário
   * @returns Array com os pius do usuário
   * @complexity O(m) - Onde m é o número de pius do usuário
   */
  public getByUserId(userId: string): Piu[] {
    const piuIds = this.userPiusIndex.get(userId);
    if (!piuIds) return [];
    // Converte o Set para Array e busca cada piu
    return Array.from(piuIds).map(id => this.pius.get(id)!);
  }
  /**
   * Remove um piu
   * @param id - ID do piu a ser removido
   * @returns Booleano indicando sucesso da operação
   * @complexity O(1) - Operações em Map e Set
   */
  public delete(id: string): boolean {
    const piu = this.pius.get(id);
    if (!piu) return false;
    // Remove do índice de pius por usuário
    const userPius = this.userPiusIndex.get(piu.userId);
    userPius?.delete(id);
    // Remove o piu do armazenamento principal
    return this.pius.delete(id);
  }
}

export default new PiuRepository();
