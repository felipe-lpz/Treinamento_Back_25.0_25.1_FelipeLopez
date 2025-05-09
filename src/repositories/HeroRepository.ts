/**
 * ================================================================
 * 🗂️ HERO REPOSITORY
 *
 * O que é um Repository?
 * - Um Repository (ou Repositório) é uma camada responsável por
 *   armazenar, buscar, atualizar e deletar dados de uma "fonte".
 * - Essa fonte pode ser um banco de dados real, uma API externa,
 *   ou, como neste exemplo, uma estrutura em memória (array).
 *
 * Para que ele serve?
 * - Centraliza toda a lógica de acesso aos dados, separando essa
 *   responsabilidade das regras de negócio (que ficam no Service).
 * - Facilita a manutenção e a futura troca da fonte de dados.
 *
 * Como se relaciona com o restante do projeto?
 * - O Repository é usado pelo Service (HeroService) para realizar
 *   operações como criar, listar, atualizar e deletar heróis.
 * - As rotas (heroes.routes.ts) apenas chamam métodos do Service,
 *   que por sua vez utiliza este Repository.
 *
 * 📌 Resumo da arquitetura:
 * routes ➝ service ➝ repository ➝ dados (array ou banco)
 * ================================================================
 */

import Hero from '../models/Hero';

interface ICreateHeroDTO {
  id: string;
  name: string;
  power: string;
}

interface IUpdateHeroDTO {
  id: string;
  data: {
    name: string;
    power: string;
  };
}

class HeroRepository {
  private heroes: Hero[];

  constructor() {
    // Nosso "banco de dados" será um array de heróis em memória
    this.heroes = [];
  }

  // ========================================
  // CREATE → Cria e armazena um novo herói
  // ========================================
  public create(data: ICreateHeroDTO): Hero {
    const { id, name, power } = data;

    const hero = new Hero(id, name, power);
    this.heroes.push(hero); // salva no array

    return hero;
  }

  // ========================================
  // READ → Leitura de dados
  // ========================================

  // Retorna todos os heróis cadastrados
  public getAll(): Hero[] {
    return this.heroes;
  }

  // Busca um herói específico pelo ID
  public getById(id: string): Hero | undefined {
    return this.heroes.find(hero => hero.id === id);
  }

  // Retorna o índice (posição) do herói no array
  public findIndexById(id: string): number {
    return this.heroes.findIndex(hero => hero.id === id);
  }

  // ========================================
  // UPDATE → Atualiza um herói existente
  // ========================================
  public update(data: IUpdateHeroDTO): Hero {
    const index = this.findIndexById(data.id);

    this.heroes[index] = {
      ...this.heroes[index], // mantém dados antigos
      ...data.data, // sobrescreve com dados novos
    };

    return this.heroes[index];
  }

  // ========================================
  // DELETE → Remove um herói do array
  // ========================================
  public delete(index: number): void {
    this.heroes.splice(index, 1); // remove 1 elemento na posição index
  }
}

export default HeroRepository;
