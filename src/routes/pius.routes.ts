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
  // Verificar se userId está sendo recebido corretamente
  console.log('UserId recebido:', req.params.userId);
  
  const pius = piuService.getPiusByUserId(req.params.userId);
  return res.json(pius);
});

/**
 * Rota: GET /pius/search/:query
 * Busca pius por texto (feature bônus)
 */
piusRouter.get('/search', (req, res) => {
  const query = req.query.q as string || '';
  const pius = piuService.searchPius(query);
  return res.json(pius);
});

/**
 * Rota: GET /pius/trending/:count
 * Retorna N pius aleatórios (feature bônus)
 */
piusRouter.get('/trending/:count', (req, res) => {
  // Verificar se count está sendo recebido corretamente
  console.log('Count recebido:', req.params.count);
  
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
// src/routes/pius.routes.ts - no endpoint DELETE
piusRouter.delete('/:id', (req, res) => {
  console.log('Tentando excluir piu com ID:', req.params.id);
  
  const piuBeforeDeletion = piuService.findById(req.params.id);
  
  if (!piuBeforeDeletion) {
    console.log('Piu não encontrado para exclusão.');
    return res.status(404).json({ message: 'Piu não encontrado' });
  }
  
  const userId = piuBeforeDeletion.userId;
  console.log(`Este piu pertence ao usuário: ${userId}`);
  
  const deleted = piuService.delete(req.params.id);
  console.log(`Resultado da exclusão: ${deleted}`);
  
  // Verificar se o piu realmente foi excluído
  const piuAfterDeletion = piuService.findById(req.params.id);
  console.log(`Piu ainda existe após exclusão: ${piuAfterDeletion !== undefined}`);
  
  if (!deleted) {
    return res.status(404).json({ message: 'Piu não encontrado' });
  }

  return res.status(204).send();
});

export default piusRouter;