/**
 * ================================================================
 * 🧱 HERO MODEL
 *
 * O que é um Model?
 * - Um Model (ou modelo) representa a estrutura de um "objeto do mundo real"
 *   que será manipulado dentro da aplicação — neste caso, um super-herói.
 *
 * Para que serve?
 * - Define quais propriedades cada herói deve ter (id, name, power).
 * - Pode servir como base para o uso futuro com banco de dados (ORMs como Prisma, TypeORM).
 *
 * Como se relaciona com os outros arquivos?
 * - É usado pelo Repository para criar e armazenar heróis.
 * - O Service e as rotas manipulam instâncias desse modelo.
 *
 * 📌 Exemplo de uso:
 * const hero = new Hero('1', 'Batman', 'Inteligência estratégica');
 *
 * 📦 Fluxo de dados:
 * rotas → serviço → repositório → cria instância do modelo
 * ================================================================
 */

class Hero {
  id: string; // Identificador único do herói
  name: string; // Nome do herói (ex: Batman)
  power: string; // Poder ou habilidade principal (ex: Inteligência)

  /**
   * Construtor para criar um novo herói com base nos dados fornecidos
   */
  constructor(id: string, name: string, power: string) {
    this.id = id;
    this.name = name;
    this.power = power;
  }
}

export default Hero;
