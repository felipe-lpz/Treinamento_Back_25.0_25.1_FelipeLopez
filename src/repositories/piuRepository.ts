// src/repositories/piuRepository.ts
import { randomUUID } from 'crypto';
import Piu from '../models/piu';

interface ICreatePiuDTO {
  userId: string;
  text: string;
}

/**
 * Repositório que gerencia operações de CRUD para pius
 * Implementado com Maps para garantir performance O(1)
 */
class PiuRepository {
  // Armazenamento primário: id -> Piu
  private pius: Map<string, Piu>;
  
  // Índice secundário: userId -> Set de piuIds
  private userPiusIndex: Map<string, Set<string>>;

  constructor() {
    this.pius = new Map<string, Piu>();
    this.userPiusIndex = new Map<string, Set<string>>();
  }

  /**
   * Cria um novo piu
   * Complexidade: O(1)
   */
  public create(data: ICreatePiuDTO): Piu {
    const id = randomUUID();
    
    const piu = new Piu(id, data.userId, data.text);
    
    // Armazena no Map principal
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
   * Complexidade: O(n)
   */
  public getAll(): Piu[] {
    return Array.from(this.pius.values());
  }

  /**
   * Busca um piu pelo ID
   * Complexidade: O(1)
   */
  public getById(id: string): Piu | undefined {
    return this.pius.get(id);
  }

  /**
   * Busca pius de um usuário específico
   * Complexidade: O(m) onde m é o número de pius do usuário
   */
  public getByUserId(userId: string): Piu[] {
    const piuIds = this.userPiusIndex.get(userId);
    
    if (!piuIds) return [];
    
    // Converte o Set para Array e busca cada piu
    return Array.from(piuIds).map(id => this.pius.get(id)!);
  }

  /**
   * Remove um piu
   * Complexidade: O(1)
   */
  public delete(id: string): boolean {
    const piu = this.pius.get(id);
    
    if (!piu) return false;
    
    // Remove do índice de pius por usuário
    const userPius = this.userPiusIndex.get(piu.userId);
    userPius?.delete(id);
    
    // Remove o piu
    return this.pius.delete(id);
  }
}

export default new PiuRepository();