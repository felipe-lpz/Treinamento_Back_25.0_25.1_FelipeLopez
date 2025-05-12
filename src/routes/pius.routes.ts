import { Router } from 'express';

import piuService from '../services/piuService';

const piusRouter = Router();

/**
 * Rota: POST /pius
 * Descrição: Cria um novo piu
 * Complexidade: O(1) - Operação de inserção em Map
 * Requisição: { userId: string, text: string }
 * Resposta: 201 Created (Piu criado) ou 400 Bad Request (erro)
 */
piusRouter.post('/', (req, res) => {
  const { userId, text } = req.body;

  if (!userId || !text) {
    return res.status(400).json({
      message: 'userId e text são campos obrigatórios',
    });
  }

  const result = piuService.create(userId, text);

  if ('error' in result) {
    return res.status(400).json({ message: result.error });
  }

  return res.status(201).json(result.piu);
});

/**
 * Rota: GET /pius
 * Descrição: Lista todos os pius
 * Complexidade: O(n) - Onde n é o número total de pius
 * Resposta: 200 OK (Array de pius)
 */
piusRouter.get('/', (req, res) => {
  const pius = piuService.listAll();
  return res.json(pius);
});

/**
 * Rota: GET /pius/user/:userId
 * Descrição: Lista todos os pius de um usuário específico (feature bônus)
 * Complexidade: O(m) - Onde m é o número de pius do usuário
 * Resposta: 200 OK (Array de pius do usuário)
 */
piusRouter.get('/user/:userId', (req, res) => {
  const pius = piuService.getPiusByUserId(req.params.userId);
  return res.json(pius);
});

/**
 * Rota: GET /pius/search/:query
 * Descrição: Busca pius por texto (feature bônus)
 * Complexidade: O(n) - Onde n é o número total de pius
 * Resposta: 200 OK (Array de pius que contêm o texto de busca)
 */
piusRouter.get('/search/:query', (req, res) => {
  const pius = piuService.searchPius(req.params.query || '');
  return res.json(pius);
});

/**
 * Rota: GET /pius/trending/:count
 * Descrição: Retorna N pius aleatórios (feature bônus)
 * Complexidade: O(n) - Onde n é o número total de pius (para o embaralhamento)
 * Resposta: 200 OK (Array de pius aleatórios)
 */
piusRouter.get('/trending/:count', (req, res) => {
  const count = parseInt(req.params.count, 10) || 5;
  const pius = piuService.getRandomPius(count);
  return res.json(pius);
});

/**
 * Rota: GET /pius/:id
 * Descrição: Busca um piu pelo ID (feature bônus - prioridade)
 * Complexidade: O(1) - Operação de busca em Map
 * Resposta: 200 OK (Piu encontrado) ou 404 Not Found
 * IMPORTANTE: esta rota deve vir DEPOIS de rotas mais específicas
 */
piusRouter.get('/:id', (req, res) => {
  const piu = piuService.findById(req.params.id);

  if (!piu) {
    return res.status(404).json({ message: 'Piu não encontrado' });
  }

  return res.json(piu);
});

/**
 * Rota: DELETE /pius/:id
 * Descrição: Remove um piu
 * Complexidade: O(1) - Operação de deleção em Map
 * Resposta: 204 No Content (sucesso) ou 404 Not Found
 */
piusRouter.delete('/:id', (req, res) => {
  const deleted = piuService.delete(req.params.id);

  if (!deleted) {
    return res.status(404).json({ message: 'Piu não encontrado' });
  }

  return res.status(204).send();
});

export default piusRouter;