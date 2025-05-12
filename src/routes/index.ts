// src/routes/index.ts
import { Router } from 'express';

import piusRouter from './pius.routes';
import usersRouter from './users.routes';

/**
 * Configuração central das rotas da API do PiuPiuwer
 *
 * Este arquivo agrupa todos os roteadores específicos e os expõe
 * sob um roteador principal, facilitando a organização e manutenção.
 *
 * Estrutura da API:
 * - /users: Operações CRUD para usuários
 * - /pius: Operações CRUD para pius (tweets)
 */
const routes = Router();

// Aplica o roteador de usuários no prefixo /users
routes.use('/users', usersRouter);

// Aplica o roteador de pius no prefixo /pius
routes.use('/pius', piusRouter);

/**
 * Documentação simplificada da API (disponível no endpoint /api-info)
 */
routes.get('/api-info', (req, res) => {
  return res.json({
    name: 'API PiuPiuwer',
    version: '1.0.0',
    endpoints: {
      users: {
        base: '/users',
        operations: [
          { method: 'GET', path: '/', description: 'Lista todos os usuários' },
          {
            method: 'GET',
            path: '/:id',
            description: 'Obtém um usuário específico',
          },
          { method: 'POST', path: '/', description: 'Cria um novo usuário' },
          {
            method: 'PATCH',
            path: '/:id',
            description: 'Atualiza um usuário existente',
          },
          { method: 'DELETE', path: '/:id', description: 'Remove um usuário' },
        ],
      },
      pius: {
        base: '/pius',
        operations: [
          { method: 'GET', path: '/', description: 'Lista todos os pius' },
          {
            method: 'GET',
            path: '/:id',
            description: 'Obtém um piu específico',
          },
          {
            method: 'GET',
            path: '/user/:userId',
            description: 'Lista pius de um usuário',
          },
          {
            method: 'GET',
            path: '/search/:query',
            description: 'Busca pius por texto',
          },
          {
            method: 'GET',
            path: '/trending/:count',
            description: 'Obtém pius aleatórios',
          },
          { method: 'POST', path: '/', description: 'Cria um novo piu' },
          { method: 'DELETE', path: '/:id', description: 'Remove um piu' },
        ],
      },
    },
  });
});

export default routes;
