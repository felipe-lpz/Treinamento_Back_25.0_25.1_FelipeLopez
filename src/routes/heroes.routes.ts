/**
 * ================================================================
 * 🌐 HEROES ROUTER
 *
 * Este arquivo define as rotas HTTP para interagir com os heróis.
 *
 * Para que serve?
 * - As rotas recebem as requisições HTTP feitas pelo cliente (ex: frontend, Insomnia, Postman).
 * - Cada rota chama um método do Service, que contém a lógica de negócio.
 *
 * Como se relaciona com os outros arquivos?
 * ➝ Rotas chamam métodos do HeroService
 * ➝ HeroService processa dados e chama o HeroRepository
 * ➝ HeroRepository lida com os dados (array ou banco)
 *
 * 📌 Estrutura geral:
 * - POST    /heroes       → Criar herói
 * - GET     /heroes       → Listar todos os heróis
 * - GET     /heroes/:id   → Buscar herói por ID
 * - PUT     /heroes/:id   → Atualizar herói
 * - DELETE  /heroes/:id   → Remover herói
 * ================================================================
 */

import { Router } from 'express';

import HeroService from '../services/HeroService';

const heroesRouter = Router();

// ========================================
// CREATE → Criar um novo herói
// ========================================
/**
 * Rota: POST /heroes
 * Espera receber no corpo da requisição (req.body):
 * {
 *   "name": "Superman",
 *   "power": "Força sobre-humana"
 * }
 *
 * Esta rota chama o método 'create' do HeroService,
 * que por sua vez cria o herói e o armazena via HeroRepository.
 */

heroesRouter.post('/', (req, res) => {
  const { name, power } = req.body;

  if (!name || !power) {
    return res.status(400).json({
      message: 'Campos "name" e "power" são obrigatórios',
    });
  }

  const hero = HeroService.create(name, power);
  return res.status(201).json(hero);
});

// ========================================
// READ → Leitura de heróis
// ========================================

/**
 * Rota: GET /heroes
 * Retorna todos os heróis armazenados.
 *
 * Esta rota chama o método 'listAll' do HeroService,
 * que busca os dados no HeroRepository.
 */

heroesRouter.get('/', (req, res) => {
  const heroes = HeroService.listAll();
  return res.json(heroes);
});

/**
 * Rota: GET /heroes/:id
 * Espera receber um ID na URL como parâmetro de rota.
 * Exemplo: /heroes/123abc
 *
 * Chama o método 'findById' do HeroService, que retorna o herói correspondente.
 * Caso não encontre, retorna erro 404.
 */

heroesRouter.get('/:id', (req, res) => {
  const hero = HeroService.findById(req.params.id);

  if (!hero) {
    return res.status(404).json({ message: 'Herói não encontrado' });
  }

  return res.json(hero);
});

// ========================================
// UPDATE → Atualizar um herói existente
// ========================================
/**
 * Rota: PUT /heroes/:id
 * Espera receber um ID na URL (params) e os novos dados no corpo (body):
 * {
 *   "name": "Batman",
 *   "power": "Inteligência estratégica"
 * }
 *
 * Esta rota chama o método 'update' do HeroService,
 * que verifica se o herói existe e, se sim, atualiza os dados no HeroRepository.
 */

heroesRouter.put('/:id', (req, res) => {
  const { name, power } = req.body;

  if (!name || !power) {
    return res.status(400).json({
      message: 'Campos "name" e "power" são obrigatórios',
    });
  }

  const updatedHero = HeroService.update(req.params.id, name, power);

  if (!updatedHero) {
    return res.status(404).json({ message: 'Herói não encontrado' });
  }

  return res.json(updatedHero);
});

// ========================================
// DELETE → Remover um herói do sistema
// ========================================
/**
 * Rota: DELETE /heroes/:id
 * Espera receber um ID na URL como parâmetro.
 *
 * Esta rota chama o método 'delete' do HeroService,
 * que procura o herói e o remove do array usando o HeroRepository.
 * Se o herói não for encontrado, retorna erro 404.
 */

heroesRouter.delete('/:id', (req, res) => {
  const deleted = HeroService.delete(req.params.id);

  if (!deleted) {
    return res.status(404).json({ message: 'Herói não encontrado' });
  }

  return res.status(204).send(); // Sem conteúdo
});

export default heroesRouter;
