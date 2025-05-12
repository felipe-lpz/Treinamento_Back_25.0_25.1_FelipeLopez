import { Router } from 'express';

import userService from '../services/userService';

const usersRouter = Router();

/**
 * Rota: POST /users
 * Descrição: Cria um novo usuário
 * Complexidade: O(1) - Operações em Maps
 * Requisição: { username, email, name, birth, cpf, phone, about }
 * Resposta: 201 Created (usuário criado) ou 400 Bad Request (erro)
 */
usersRouter.post('/', (req, res) => {
  const { username, email, name, birth, cpf, phone, about } = req.body;

  // Validações básicas
  if (!username || !email || !name || !birth || !cpf || !phone) {
    return res.status(400).json({
      message: 'Todos os campos são obrigatórios',
    });
  }

  // Converter string de data para objeto Date
  const birthDate = new Date(birth);

  const result = userService.create(
    username,
    email,
    name,
    birthDate,
    cpf,
    phone,
    about || ''
  );

  if ('error' in result) {
    return res.status(400).json({ message: result.error });
  }

  return res.status(201).json(result.user);
});

/**
 * Rota: GET /users
 * Descrição: Lista todos os usuários
 * Complexidade: O(n) - Onde n é o número total de usuários
 * Resposta: 200 OK (Array de usuários)
 */
usersRouter.get('/', (req, res) => {
  const users = userService.listAll();
  return res.json(users);
});

/**
 * Rota: GET /users/:id
 * Descrição: Busca um usuário pelo ID
 * Complexidade: O(1) - Busca direta em Map
 * Resposta: 200 OK (usuário encontrado) ou 404 Not Found
 */
usersRouter.get('/:id', (req, res) => {
  const user = userService.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  return res.json(user);
});

/**
 * Rota: PATCH /users/:id
 * Descrição: Atualiza um usuário
 * Complexidade: O(1) - Operações em Maps
 * Requisição: Campos a serem atualizados (todos opcionais)
 * Resposta: 200 OK (usuário atualizado) ou 400 Bad Request (erro)
 */
usersRouter.patch('/:id', (req, res) => {
  const { username, email, name, birth, cpf, phone, about } = req.body;
  
  // Converter string de data para objeto Date se fornecido
  const birthDate = birth ? new Date(birth) : undefined;

  const result = userService.update(req.params.id, {
    username,
    email,
    name,
    birth: birthDate,
    cpf,
    phone,
    about,
  });

  if ('error' in result) {
    return res.status(400).json({ message: result.error });
  }

  return res.json(result.user);
});

/**
 * Rota: DELETE /users/:id
 * Descrição: Remove um usuário
 * Complexidade: O(1) - Operação de remoção em Map
 * Resposta: 204 No Content (sucesso) ou 404 Not Found
 */
usersRouter.delete('/:id', (req, res) => {
  const deleted = userService.delete(req.params.id);

  if (!deleted) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  return res.status(204).send();
});

export default usersRouter;