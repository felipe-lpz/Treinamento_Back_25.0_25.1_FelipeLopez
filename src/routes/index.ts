// src/routes/index.ts
import { Router } from 'express';

import usersRouter from './users.routes';
import piusRouter from './pius.routes';

const routes = Router();

// Rotas de usuários
routes.use('/users', usersRouter);

// Rotas de pius
routes.use('/pius', piusRouter);

export default routes;