// src/routes/pius.routes.ts
import { Router } from 'express';
import piuService from '../services/piuService';

const piusRouter = Router();

/**
 * Rota: POST /pius
 * Cria um novo piu
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
 * Lista todos os pius
 */
piusRouter.get('/', (req, res) => {
  const pius = piuService.listAll();
  return res.json(pius);
});

/**
 * Rota: GET /pius/user/:userId
 * Lista todos os pius de um usuário (feature bônus)
 */
piusRouter.get('/user/:userId', (req, res) => {
  const pius = piuService.getPiusByUserId(req.params.userId);
  return res.json(pius);
});

/**
 * Rota: GET /pius/search/:query
 * Busca pius por texto (feature bônus)
 */
piusRouter.get('/search/:query', (req, res) => {
  console.log('=== ROTA DE BUSCA ACESSADA ===');
  console.log('Parâmetros:', req.params);
  console.log('Query:', req.params.query);
  
  const pius = piuService.searchPius(req.params.query || '');
  console.log('Resultados:', pius.length);
  
  return res.json(pius);
});

/**
 * Rota: GET /pius/trending/:count
 * Retorna N pius aleatórios (feature bônus)
 */
piusRouter.get('/trending/:count', (req, res) => {
  const count = parseInt(req.params.count, 10) || 5;
  const pius = piuService.getRandomPius(count);
  return res.json(pius);
});

/**
 * Rota: GET /pius/:id
 * Busca um piu pelo ID (feature bônus)
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
 * Remove um piu
 */
piusRouter.delete('/:id', (req, res) => {
  const deleted = piuService.delete(req.params.id);

  if (!deleted) {
    return res.status(404).json({ message: 'Piu não encontrado' });
  }

  return res.status(204).send();
});

export default piusRouter;