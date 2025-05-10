// src/routes/users.routes.ts
import { Router } from 'express';
import userService from '../services/userService';

const usersRouter = Router();

/**
 * Rota: POST /users
 * Cria um novo usuário
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
 * Lista todos os usuários
 */
usersRouter.get('/', (req, res) => {
  const users = userService.listAll();
  return res.json(users);
});

/**
 * Rota: GET /users/:id
 * Busca um usuário pelo ID
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
 * Atualiza um usuário
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
 * Remove um usuário
 */
usersRouter.delete('/:id', (req, res) => {
  const deleted = userService.delete(req.params.id);

  if (!deleted) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  return res.status(204).send();
});

export default usersRouter;