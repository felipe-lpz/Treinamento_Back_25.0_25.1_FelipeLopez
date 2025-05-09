/**
 * ================================================================
 * 🧠 HERO SERVICE
 *
 * O que é um Service?
 * - O Service é a camada que implementa as regras de negócio da aplicação.
 * - Ele processa dados, aplica lógicas, validações e decide como agir.
 *
 * Para que serve?
 * - Centraliza toda a lógica que envolve operações sobre os dados.
 * - Evita colocar regras diretamente nas rotas, deixando o código limpo.
 *
 * Como se relaciona com o restante do projeto?
 * - As rotas chamam os métodos do Service (ex: criar herói, listar, etc).
 * - O Service chama o Repository para acessar ou manipular os dados.
 *
 * 📌 Resumo da arquitetura:
 * routes ➝ service ➝ repository ➝ dados (array ou banco)
 * ================================================================
 */

import { randomUUID } from 'crypto';

import Hero from '../models/Hero';
import HeroRepository from '../repositories/HeroRepository';

class HeroService {
  private repository: HeroRepository;

  constructor() {
    // Cria uma instância do repositório que gerencia os heróis
    this.repository = new HeroRepository();
  }

  // ========================================
  // CREATE → Criação de novo herói
  // ========================================
  /**
   * Cria um novo herói com os dados fornecidos.
   * Aqui é gerado um ID aleatório usando a biblioteca crypto,
   * e em seguida o método 'create' do repositório é chamado
   * para armazenar o herói na fonte de dados (array em memória).
   */
  public create(name: string, power: string): Hero {
    const id = randomUUID(); // Gera um ID único

    const hero = this.repository.create({
      id,
      name,
      power,
    });

    return hero;
  }

  // ========================================
  // READ → Leitura de heróis
  // ========================================

  // Lista todos os heróis existentes
  public listAll(): Hero[] {
    return this.repository.getAll();
  }

  // Busca um herói específico pelo ID
  public findById(id: string): Hero | undefined {
    return this.repository.getById(id);
  }

  // ========================================
  // UPDATE → Atualização de herói
  // ========================================
  /**
   * Atualiza os dados de um herói existente.
   * Primeiro verifica se o herói com o ID existe.
   * Se existir, chama o método 'update' do repositório
   * para sobrescrever os dados no array.
   * Caso contrário, retorna null.
   */
  public update(id: string, name: string, power: string): Hero | null {
    const existingHero = this.repository.getById(id);

    if (!existingHero) return null;

    return this.repository.update({
      id,
      data: { name, power },
    });
  }

  // ========================================
  // DELETE → Remoção de herói
  // ========================================
  /**
   * Remove um herói com base no ID.
   * Primeiro encontra o índice do herói,
   * depois chama o método 'delete' do repositório
   * para removê-lo do array.
   */
  public delete(id: string): boolean {
    const index = this.repository.findIndexById(id);

    if (index === -1) return false;

    this.repository.delete(index);
    return true;
  }
}

export default new HeroService();
